import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-card p-12 rounded-3xl border border-border/50 shadow-strong">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their workflow. 
            Start your journey today with our powerful platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium group">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
