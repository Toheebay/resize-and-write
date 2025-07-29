import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, Sparkles } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for occasional use",
      icon: Zap,
      features: [
        "5 conversions per day",
        "Basic PDF compression",
        "Standard processing speed",
        "Email support",
        "Basic document templates"
      ],
      limitations: [
        "Watermarked outputs",
        "Limited file size (10MB)"
      ],
      cta: "Get Started Free",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      description: "For professionals and small teams",
      icon: Crown,
      features: [
        "Unlimited conversions",
        "Advanced compression options",
        "Priority processing",
        "24/7 priority support",
        "Premium document templates",
        "Custom logo uploads",
        "Batch processing",
        "API access"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      variant: "gradient" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "month",
      description: "For large organizations",
      icon: Sparkles,
      features: [
        "Everything in Pro",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security features",
        "SLA guarantee",
        "Custom document workflows",
        "Advanced analytics"
      ],
      limitations: [],
      cta: "Contact Sales",
      variant: "default" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your PDF processing needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-elegant ${
                plan.popular 
                  ? 'ring-2 ring-primary transform scale-105 shadow-elegant bg-gradient-card' 
                  : 'hover:transform hover:scale-105 bg-background'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-hero text-white px-4 py-1 rounded-full text-sm font-medium shadow-glow">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center shadow-glow`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {plan.description}
                </CardDescription>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <li key={`limit-${limitIndex}`} className="flex items-center opacity-60">
                      <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.variant}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Features */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Need Custom Solutions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our enterprise solutions can be tailored to your specific needs with custom integrations, 
              dedicated support, and volume discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg">
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
            <Check className="h-5 w-5" />
            <span className="font-medium">30-day money-back guarantee on all paid plans</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;