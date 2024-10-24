import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const content = formData.get('content') as string;
    const questionId = formData.get('questionId') as string;
    const files = formData.getAll('attachments') as File[];

    // In a real app, you'd get the user from the session
    const user = await prisma.user.findFirst({
      where: { role: 'MANAGER' }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the answer
    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        authorId: user.id,
      },
    });

    // Update question status
    await prisma.question.update({
      where: { id: questionId },
      data: { status: 'ANSWERED' },
    });

    // Handle file uploads
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // In production, use a proper file storage service
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        const filename = `${Date.now()}-${file.name}`;
        const path = join('uploads', filename);
        
        await writeFile(join(uploadDir, filename), buffer);

        return prisma.attachment.create({
          data: {
            filename: file.name,
            path,
            mimetype: file.type,
            size: buffer.length,
            answerId: answer.id,
          },
        });
      })
    );

    return NextResponse.json({ answer, attachments });
  } catch (error) {
    console.error('Error creating answer:', error);
    return NextResponse.json(
      { error: 'Error creating answer' },
      { status: 500 }
    );
  }
}