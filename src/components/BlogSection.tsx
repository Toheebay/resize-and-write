import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User, ArrowRight, BookOpen, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  image?: string;
  tags?: string[];
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const createSamplePosts = async () => {
    if (!username.trim()) {
      toast.error("Please enter your name to create posts");
      return;
    }

    const samplePosts = [
      {
        title: "How to Build a Personal Website for Free in 2025",
        content: `A step-by-step guide for students, freelancers, and job seekers who want to create a personal portfolio website without spending a dime.

**Key Points:**

**Free tools you can use:**
- Vercel - Free hosting with automatic deployments
- GitHub - Free code repository and version control
- Netlify - Alternative free hosting with continuous deployment
- GitHub Pages - Direct hosting from your repository

**Simple HTML/CSS templates:**
- Choose responsive, mobile-first designs
- Use CSS Grid and Flexbox for layouts
- Implement clean typography and color schemes
- Add smooth animations and transitions

**Hosting & domain options:**
- Free subdomains from hosting providers
- Custom domain connection (requires domain purchase)
- SSL certificates included automatically
- Global CDN for fast loading times

**Getting Started:**
1. Create a GitHub account
2. Choose a template or start from scratch
3. Customize with your content and branding
4. Connect to hosting service
5. Deploy and share your new website

This approach gives you a professional web presence without any upfront costs, perfect for students and new professionals building their online portfolio.`,
        author: "anonymous",
        author_name: username,
        tags: ["website", "free", "portfolio", "students"]
      },
      {
        title: "Top 5 Most In-Demand Scholarships in 2025 + How to Apply",
        content: `Highlight reputable international scholarships and what documents are needed.

**Top 5 Scholarships:**

**1. DAAD Scholarships (Germany)**
- Full funding for Master's and PhD programs
- Monthly stipend + health insurance
- Application deadline: October 31st

**2. Chevening Scholarships (UK)**
- One-year Master's degree funding
- Leadership development program
- Application deadline: November 2nd

**3. Erasmus+ Program (Europe)**
- Study across multiple European countries
- Partial to full funding available
- Rolling applications throughout the year

**4. Mastercard Foundation Scholarships**
- Focus on African students
- Comprehensive support package
- Various partner universities

**5. Fulbright Program (USA)**
- Research and study opportunities
- Cultural exchange component
- Country-specific deadlines

**Required Documents:**
- Motivation letters (tailored to each program)
- Academic CV/Resume
- Statement of Purpose (SOP)
- Academic transcripts
- Letters of recommendation
- Language proficiency certificates
- Research proposals (for PhD applicants)

**How to generate documents using our free tool:**
Use our Professional Document Generator to create polished motivation letters, CVs, and statements of purpose. Our templates are specifically designed for scholarship applications and include all necessary sections and formatting.`,
        author: "anonymous",
        author_name: username,
        tags: ["scholarships", "education", "applications", "funding"]
      },
      {
        title: "Why Every Graduate Should Be on Google Scholar",
        content: `Explain how Google Scholar profiles improve credibility for researchers and students.

**Benefits for postgraduate applicants:**

**Professional Credibility:**
- Establish yourself as a serious researcher
- Showcase your academic contributions
- Build authority in your field of study

**Networking Opportunities:**
- Connect with researchers worldwide
- Collaborate on publications
- Find mentors and advisors

**Application Advantages:**
- Professors can easily verify your work
- Demonstrates research experience
- Shows commitment to academic excellence

**How to set up a profile:**

1. **Create Your Profile:**
   - Go to scholar.google.com
   - Click "My Profile" and sign in
   - Add your affiliation and research interests

2. **Add Your Publications:**
   - Import from databases automatically
   - Manually add thesis, papers, presentations
   - Include conference proceedings

3. **Optimize Your Profile:**
   - Add a professional photo
   - Write a compelling bio
   - Link to your institutional page

**Tips on citation tracking:**
- Monitor who cites your work
- Set up alerts for new citations
- Use metrics to measure impact
- Track h-index and i10-index
- Export citation data for applications

**Best Practices:**
- Keep profile updated regularly
- Verify all publications are accurate
- Use consistent name formatting
- Add co-authors when possible

Having a strong Google Scholar presence can significantly boost your academic profile and make you stand out in competitive application processes.`,
        author: "anonymous",
        author_name: username,
        tags: ["google scholar", "research", "academic", "profile"]
      },
      {
        title: "I'll Design Your Website for Free – Here's Why and How",
        content: `🚀 AMAZING OPPORTUNITY ALERT! Are you a student, non-profit, or someone who needs a professional website but can't afford one? I'm offering completely FREE website design services - no hidden fees, no catches!

**Why am I doing this?**
Because I believe everyone deserves a stunning online presence, regardless of their budget. I've helped over 50+ students land internships and scholarships just by creating professional portfolio websites for them.

**What you'll get for FREE:**

**What we offer:**

**Free Website Design Services:**
- Custom responsive website design
- Mobile-optimized layouts
- SEO-friendly structure
- Professional branding consultation

**Who Qualifies:**
- Current students (with valid student ID)
- Registered non-profit organizations
- Low-income individuals and families
- Small businesses in underserved communities

**Our Portfolio:**
- Student portfolio websites
- Non-profit organization sites
- Small business landing pages
- Personal branding websites

**Sample Works:**

1. **Student Portfolio for Sarah M.**
   - Clean, minimalist design
   - Project showcase with image galleries
   - Contact form and social links
   - Mobile-responsive layout

2. **Local Food Bank Website**
   - Donation integration
   - Volunteer signup forms
   - Event calendar
   - Multi-language support

3. **Freelance Writer Portfolio**
   - Blog integration
   - Client testimonials
   - Service packages display
   - SEO optimization

**How to request our service:**

1. **Application Process:**
   - Fill out our qualification form
   - Provide documentation of eligibility
   - Submit project requirements
   - Schedule consultation call

2. **What We Need From You:**
   - Clear project goals and requirements
   - Content and images for the website
   - Feedback during the design process
   - Commitment to promote our services

3. **Timeline:**
   - Initial consultation: 1 week
   - Design mockups: 2 weeks
   - Development: 2-3 weeks
   - Revisions and launch: 1 week

**Contact us today** to see if you qualify for our free website design program. Together, we can build something amazing that helps you achieve your goals online.`,
        author: "anonymous",
        author_name: username,
        tags: ["free design", "students", "non-profit", "community"]
      }
    ];

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert(samplePosts);

      if (error) throw error;
      
      toast.success("Sample blog posts created successfully!");
      setIsDialogOpen(false);
      setUsername("");
      fetchPosts();
    } catch (error: any) {
      console.error('Error creating posts:', error);
      toast.error('Failed to create sample posts');
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Latest from Our
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover helpful tips, tutorials, and insights to boost your productivity and achieve your goals.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to read our amazing content!
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sample Posts
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Blog Posts</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Your Name</Label>
                    <Input
                      id="username"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <Button onClick={createSamplePosts} className="w-full">
                    Create Posts
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-card bg-gradient-card border-0 hover:shadow-glow transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <User className="h-4 w-4 ml-2" />
                      <span>{post.author_name}</span>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-4 text-base leading-relaxed">
                      {post.content.substring(0, 200)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      onClick={() => window.open("https://www.linkedin.com/posts/opportunities-for-youth-organization_africaeducatesher-fullyfundedopportunities-activity-7355477186599866368-NImo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC-1UNkBJZ2EiMU0z8Xugh_OvJXI7XuLxAk", "_blank")}
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                View All Posts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;