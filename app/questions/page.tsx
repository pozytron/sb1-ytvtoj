import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

// Mock data - In a real app, this would come from an API
const questions = [
  {
    id: 1,
    title: "What are the current trends in sustainable construction materials?",
    description: "I'm interested in learning about eco-friendly materials that can reduce the environmental impact of construction projects.",
    category: "Materials",
    answers: 5,
    votes: 12,
    author: "John Doe",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Best practices for managing construction timeline delays?",
    description: "Looking for expert advice on handling unexpected delays in construction projects and minimizing their impact.",
    category: "Project Management",
    answers: 3,
    votes: 8,
    author: "Jane Smith",
    date: "2024-03-19",
  },
  // Add more mock questions as needed
];

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Recent Questions</h1>
        <Link href="/ask">
          <Badge className="cursor-pointer">Ask Question</Badge>
        </Link>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <Link href={`/questions/${question.id}`} key={question.id}>
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
                  <p className="text-muted-foreground">{question.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{question.category}</Badge>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{question.answers} answers</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{question.votes} votes</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Asked by {question.author} on {question.date}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}