import { Button } from "@/components/ui/button";
import { Building2, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center space-y-8 max-w-3xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Construction Q&A Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect construction managers and investors through an efficient Q&A system
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Expert Managers</h2>
            <p className="text-muted-foreground text-center">
              Get answers from experienced construction professionals
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
            <MessageSquare className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Direct Communication</h2>
            <p className="text-muted-foreground text-center">
              Ask questions and receive detailed responses
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
            <Building2 className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Project Insights</h2>
            <p className="text-muted-foreground text-center">
              Gain valuable insights about construction projects
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/questions">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Questions
            </Button>
          </Link>
          <Link href="/ask">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Ask a Question
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}