import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: number;
  code: string;
  businessType: string[];
}

const AdminPanel = () => {
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Formulário para novo template
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    duration: "",
    rating: 5,
    code: "",
    businessType: [] as string[]
  });

  const categories = [
    { id: "sales", name: "Sales & Promos" },
    { id: "food", name: "Food & Dining" },
    { id: "services", name: "Services" },
    { id: "product", name: "Products" },
    { id: "seasonal", name: "Seasonal" },
    { id: "events", name: "Events" }
  ];

  const businessTypes = [
    "Retail", "Supermarket", "Electronics", "Restaurant", "Cafe", "Food Delivery",
    "Barber Shop", "Salon", "Clinic", "Tech", "Fashion", "Gifts", "All Business Types"
  ];

  // Carregar templates do localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem("videoTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Templates padrão se não houver salvos
      const defaultTemplates: VideoTemplate[] = [
        {
          id: "1",
          title: "Flash Sale Promo",
          category: "sales",
          description: "High-energy flash sale template with countdown timer and discount highlights",
          thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
          duration: "30s",
          rating: 4.8,
          code: "FLASH001",
          businessType: ["Retail", "Supermarket", "Electronics"]
        },
        {
          id: "2", 
          title: "Restaurant Special",
          category: "food",
          description: "Appetizing food showcase with elegant transitions and mouth-watering effects",
          thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
          duration: "45s",
          rating: 4.9,
          code: "FOOD002",
          businessType: ["Restaurant", "Cafe", "Food Delivery"]
        }
      ];
      setTemplates(defaultTemplates);
      localStorage.setItem("videoTemplates", JSON.stringify(defaultTemplates));
    }
  }, []);

  // Salvar templates no localStorage
  const saveTemplates = (newTemplates: VideoTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem("videoTemplates", JSON.stringify(newTemplates));
  };

  // Gerar ID único
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Gerar código automático
  const generateCode = (category: string) => {
    const prefix = category.toUpperCase().substr(0, 4);
    const number = String(templates.length + 1).padStart(3, '0');
    return `${prefix}${number}`;
  };

  // Adicionar novo template
  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newTemplate: VideoTemplate = {
      id: editingId || generateId(),
      ...formData,
      code: formData.code || generateCode(formData.category),
      rating: Number(formData.rating)
    };

    let newTemplates;
    if (editingId) {
      newTemplates = templates.map(t => t.id === editingId ? newTemplate : t);
      toast({
        title: "Sucesso! ✅",
        description: "Template atualizado com sucesso"
      });
    } else {
      newTemplates = [...templates, newTemplate];
      toast({
        title: "Sucesso! 🎬",
        description: "Novo template adicionado com sucesso"
      });
    }

    saveTemplates(newTemplates);
    resetForm();
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      thumbnail: "",
      duration: "",
      rating: 5,
      code: "",
      businessType: []
    });
    setIsAdding(false);
    setEditingId(null);
  };

  // Excluir template
  const handleDelete = (id: string) => {
    const newTemplates = templates.filter(t => t.id !== id);
    saveTemplates(newTemplates);
    toast({
      title: "Template removido",
      description: "Template excluído com sucesso"
    });
  };

  // Editar template
  const handleEdit = (template: VideoTemplate) => {
    setFormData({
      title: template.title,
      category: template.category,
      description: template.description,
      thumbnail: template.thumbnail,
      duration: template.duration,
      rating: template.rating,
      code: template.code,
      businessType: template.businessType
    });
    setEditingId(template.id);
    setIsAdding(true);
  };

  // Toggle business type
  const toggleBusinessType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      businessType: prev.businessType.includes(type)
        ? prev.businessType.filter(t => t !== type)
        : [...prev.businessType, type]
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gerencie os templates de vídeo do seu estúdio
            </p>
          </div>
          
          <Button 
            variant="cta" 
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Template
          </Button>
        </div>

        {/* Formulário de Adição/Edição */}
        {isAdding && (
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingId ? "Editar Template" : "Adicionar Novo Template"}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Título *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    placeholder="Ex: Flash Sale Promo"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Duração</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
                    placeholder="Ex: 30s"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Código</label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({...prev, code: e.target.value}))}
                    placeholder="Deixe vazio para gerar automaticamente"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rating (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({...prev, rating: Number(e.target.value)}))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">URL da Thumbnail</label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) => setFormData(prev => ({...prev, thumbnail: e.target.value}))}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Descrição *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  placeholder="Descreva o template de vídeo..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipos de Negócio</label>
                <div className="flex flex-wrap gap-2">
                  {businessTypes.map(type => (
                    <Badge
                      key={type}
                      variant={formData.businessType.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleBusinessType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="cta" onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Atualizar" : "Salvar"} Template
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-0">
                {template.thumbnail && (
                  <img 
                    src={template.thumbnail} 
                    alt={template.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                )}
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{template.title}</h3>
                    <span className="text-sm text-muted-foreground">★ {template.rating}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.businessType.slice(0, 2).map(type => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {template.businessType.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.businessType.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{template.code}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum template encontrado
            </p>
            <Button variant="cta" onClick={() => setIsAdding(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Adicionar Primeiro Template
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;