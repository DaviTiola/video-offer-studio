import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Plus, Video, Clock, CheckCircle, AlertCircle, User, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  project_name: string;
  status: string;
  date_submitted: string;
  template_id: string | null;
  video_url: string | null;
}

interface Profile {
  display_name: string | null;
  email: string | null;
  video_credits: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, email, video_credits')
        .eq('user_id', user?.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch user projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('id, project_name, status, date_submitted, template_id, video_url')
        .eq('user_id', user?.id)
        .order('date_submitted', { ascending: false });

      if (projectsError) {
        console.error('Projects fetch error:', projectsError);
        toast({
          title: "Error",
          description: "Failed to load projects.",
          variant: "destructive",
        });
      } else {
        setProjects(projectsData || []);
      }
    } catch (error) {
      console.error('Data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'revision':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in progress':
        return <Clock className="h-4 w-4" />;
      case 'revision':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {profile?.display_name || profile?.email || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your video projects and track their progress
            </p>
          </div>
          <Button onClick={() => window.location.href = '/briefing'} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video Credits</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.video_credits || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status.toLowerCase() === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="mb-8" />

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
          
          {projects.length === 0 ? (
            <Card className="p-12 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first video project and bring your vision to life
              </p>
              <Button onClick={() => window.location.href = '/briefing'}>
                Create Your First Project
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.project_name}</CardTitle>
                        <CardDescription>
                          Submitted on {new Date(project.date_submitted).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={`${getStatusColor(project.status)} text-white flex items-center gap-1`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress indicator */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-muted-foreground">
                            {project.status.toLowerCase() === 'completed' ? '100%' : 
                             project.status.toLowerCase() === 'in progress' ? '50%' : '25%'}
                          </span>
                        </div>
                        <Progress 
                          value={project.status.toLowerCase() === 'completed' ? 100 : 
                                 project.status.toLowerCase() === 'in progress' ? 50 : 25} 
                          className="h-2"
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {project.video_url && (
                          <Button variant="default" size="sm">
                            Watch Video
                          </Button>
                        )}
                        {project.status.toLowerCase() === 'revision' && (
                          <Button variant="secondary" size="sm">
                            Request Changes
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;