import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const files = formData.getAll('attachments') as File[];

    // In a real app, you'd get the user from the session
    const user = await prisma.user.findFirst({
      where: { role: 'INVESTOR' }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the question
    const question = await prisma.question.create({
      data: {
        title,
        description,
        category,
        authorId: user.id,
      },
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
            questionId: question.id,
          },
        });
      })
    );

    return NextResponse.json({ question, attachments });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Error creating question' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        attachments: true,
        answers: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Error fetching questions' },
      { status: 500 }
    );
  }
}