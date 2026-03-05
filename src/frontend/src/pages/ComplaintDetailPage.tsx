import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MapPin,
  MessageSquare,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AppFooter } from "../components/AppFooter";
import { AppHeader } from "../components/AppHeader";
import {
  PriorityBadge,
  RoleBadge,
  StatusBadge,
} from "../components/StatusBadge";
import { useApp } from "../context/AppContext";

const STATUS_STEPS = [
  { key: "pending", label: "Submitted", icon: CheckCircle2 },
  { key: "under_review", label: "Under Review", icon: CheckCircle2 },
  { key: "in_progress", label: "In Progress", icon: CheckCircle2 },
  { key: "resolved", label: "Resolved", icon: CheckCircle2 },
] as const;

export function ComplaintDetailPage() {
  const { id } = useParams({ from: "/complaint/$id" });
  const navigate = useNavigate();
  const { getComplaintById, currentUser } = useApp();
  const complaint = getComplaintById(id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState(complaint?.aiPlan || null);

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <div
            className="text-center max-w-sm"
            data-ocid="complaint.error_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">
              Complaint Not Found
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              The complaint ID <span className="font-mono">{id}</span> doesn't
              exist or has been removed.
            </p>
            <Button
              className="mt-5"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              Back to Dashboard
            </Button>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === complaint.status);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    toast.info("Generating AI resolution plan…");
    // TODO: Gemini API - POST to https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent
    // Body: { contents: [{ parts: [{ text: `Campus complaint: ${complaint.description}. Generate a concise 3-step resolution plan.` }] }] }
    // Header: Authorization: Bearer API_KEY
    // Parse response: data.candidates[0].content.parts[0].text
    await new Promise((r) => setTimeout(r, 2000));
    setAiPlan({
      step1: `Immediately assign the complaint to the ${complaint.department || "relevant"} team lead and schedule an on-site inspection within 4 hours.`,
      step2: `Deploy the required resources and execute the fix — addressing the root cause at ${complaint.location}. Document all actions taken.`,
      step3: `Conduct quality verification, confirm resolution with the submitter (${complaint.submittedBy}), update the ticket status to Resolved, and log preventive measures.`,
      generatedAt: new Date().toLocaleDateString("en-IN"),
    });
    setIsGenerating(false);
    toast.success("AI resolution plan generated!");
  };

  const categoryColors: Record<string, string> = {
    Infrastructure: "bg-blue-50 text-blue-700 border-blue-200",
    Cleanliness: "bg-green-50 text-green-700 border-green-200",
    Safety: "bg-red-50 text-red-700 border-red-200",
    IT: "bg-purple-50 text-purple-700 border-purple-200",
    Academic: "bg-amber-50 text-amber-700 border-amber-200",
    Other: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() =>
            currentUser?.role === "admin"
              ? navigate({ to: "/admin" })
              : navigate({ to: "/dashboard" })
          }
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Main complaint card */}
          <Card className="border border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {complaint.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        categoryColors[complaint.category] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {complaint.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-display font-bold text-foreground leading-tight">
                    {complaint.title}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <StatusBadge status={complaint.status} />
                  <PriorityBadge priority={complaint.priority} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Meta info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Submitted by
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {complaint.submittedBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <RoleBadge role={complaint.submittedByRole} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {complaint.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(complaint.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {complaint.description}
                </p>
              </div>

              {/* Department */}
              {complaint.department && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Assigned to:
                  </span>
                  <span className="text-xs font-medium bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground border border-border">
                    {complaint.department}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status timeline */}
          <Card className="border border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-display font-semibold">
                Status Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-0">
                {STATUS_STEPS.map((step, i) => {
                  const isCompleted = i <= statusIndex;
                  const isCurrent = i === statusIndex;
                  return (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCompleted
                              ? "bg-primary border-primary text-white"
                              : "bg-white border-border text-muted-foreground"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-border" />
                          )}
                        </div>
                        <p
                          className={`text-xs mt-2 font-medium text-center whitespace-nowrap ${
                            isCompleted
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-1 mb-5 transition-all ${
                            i < statusIndex ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Resolution Plan */}
          <Card className="border border-border shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-display font-semibold">
                    AI-Generated Action Plan
                  </CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  data-ocid="complaint.generate_plan_button"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {aiPlan ? "Regenerate Plan" : "Generate Plan"}
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {/* TODO: Gemini API - fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ parts: [{ text: complaint.description }] }] }) }) */}
                Powered by Gemini 1.5 Flash — converts complaint text into a
                structured 3-step resolution plan
              </p>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div
                  className="flex items-center gap-3 py-6 justify-center"
                  data-ocid="complaint.loading_state"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Analyzing complaint and generating action plan…
                  </span>
                </div>
              ) : aiPlan ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {[
                    { step: 1, text: aiPlan.step1 },
                    { step: 2, text: aiPlan.step2 },
                    { step: 3, text: aiPlan.step3 },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 text-white text-sm font-bold font-display">
                        {step}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-xs font-semibold text-primary mb-1">
                          Step {step}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {text}
                        </p>
                      </div>
                      {step < 3 && (
                        <div className="hidden sm:flex items-center self-stretch">
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {aiPlan.generatedAt && (
                    <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                      Generated on {aiPlan.generatedAt}
                    </p>
                  )}
                </motion.div>
              ) : (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="complaint.plan_empty_state"
                >
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">
                    Click "Generate Plan" to get an AI-powered 3-step resolution
                    plan
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments / Updates */}
          <Card className="border border-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <CardTitle className="text-base font-display font-semibold">
                  Updates & Comments
                </CardTitle>
                <span className="ml-auto text-xs text-muted-foreground">
                  {complaint.comments?.length || 0} comment
                  {complaint.comments?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {!complaint.comments || complaint.comments.length === 0 ? (
                <div
                  className="text-center py-6 text-muted-foreground"
                  data-ocid="complaint.comments_empty_state"
                >
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No updates yet. Check back later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {complaint.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">
                            {comment.author}
                          </span>
                          <RoleBadge role={comment.role} />
                          <span className="text-xs text-muted-foreground ml-auto">
                            {new Date(comment.date).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <AppFooter />
    </div>
  );
}
