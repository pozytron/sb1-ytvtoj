"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(30, "Description must be at least 30 characters"),
  category: z.string().min(1, "Please select a category"),
});

export default function AskPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const handleFilesSelected = (files: File[]) => {
    setAttachments(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileName: string) => {
    setAttachments(prev => prev.filter(file => file.name !== fileName));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send data to an API
    // You would typically use FormData to send both the form values and files
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    
    attachments.forEach(file => {
      formData.append("attachments", file);
    });

    console.log("Form values:", values);
    console.log("Attachments:", attachments);

    toast({
      title: "Question submitted",
      description: "Your question has been posted successfully.",
    });
    router.push("/questions");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Ask a Question</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Title</FormLabel>
                <FormControl>
                  <Input placeholder="What's your construction-related question?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="materials">Materials</SelectItem>
                    <SelectItem value="project-management">Project Management</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="regulations">Regulations</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="costs">Costs & Budgeting</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide details about your question..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Attachments</FormLabel>
            <FileUpload
              onFilesSelected={handleFilesSelected}
              onFileRemove={handleFileRemove}
              files={attachments}
              maxFiles={5}
              maxSize={10}
              acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']}
            />
          </div>

          <Button type="submit" className="w-full">Submit Question</Button>
        </form>
      </Form>
    </div>
  );
}