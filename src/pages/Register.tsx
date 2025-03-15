
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import AuthCard from '@/components/AuthCard';
import AnimatedBubbles from '@/components/AnimatedBubbles';
import { register } from '@/lib/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('client');
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      return;
    }
    
    if (password !== confirmPassword) {
      // Could use toast here for error message
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        name,
        email,
        password,
        role: activeTab as 'client' | 'salon',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <AnimatedBubbles color="rgba(99, 102, 241, 0.1)" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-10"
      >
        <Logo size="large" />
      </motion.div>
      
      <div className="relative w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-semibold text-center mb-2 text-gray-900">
            Crie sua conta
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Junte-se ao SalãoZap para facilitar seus agendamentos
          </p>
        </motion.div>
        
        <AuthCard>
          <Tabs defaultValue="client" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client" className="rounded-l-md">
                <User className="mr-2 h-4 w-4" />
                Cliente
              </TabsTrigger>
              <TabsTrigger value="salon" className="rounded-r-md">
                <Scissors className="mr-2 h-4 w-4" />
                Salão
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="mt-0">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <User size={16} />
                      </div>
                      <Input
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={16} />
                      </div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 focus-animation"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-salon-500 hover:bg-salon-600 text-white h-12 transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="salon" className="mt-0">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Scissors size={16} />
                      </div>
                      <Input
                        type="text"
                        placeholder="Nome do salão"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={16} />
                      </div>
                      <Input
                        type="email"
                        placeholder="Email comercial"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 focus-animation"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 focus-animation"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-salon-500 hover:bg-salon-600 text-white h-12 transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative px-4 text-sm bg-white text-gray-500 dark:bg-black dark:text-gray-400">
              ou registre-se com
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => {/* Google integration */}}
              className="h-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {/* WhatsApp integration */}}
              className="h-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-green-500" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="font-medium text-salon-600 hover:text-salon-700 slide-underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default Register;
