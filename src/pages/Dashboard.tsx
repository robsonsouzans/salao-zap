import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, PlusCircle, Star, User, UserPlus, List, Scissors, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { getCurrentUser } from '@/lib/auth';

interface AppointmentType {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState(getCurrentUser());
  const isClient = user?.role === 'client';
  
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentType[]>([
    {
      id: '1',
      service: 'Corte de Cabelo',
      professional: 'Ana Silva',
      date: '2023-12-15',
      time: '14:30',
      status: 'scheduled',
    },
    {
      id: '2',
      service: 'Manicure',
      professional: 'Camila Oliveira',
      date: '2023-12-20',
      time: '10:00',
      status: 'scheduled',
    },
  ]);
  
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="md:pl-[240px] pt-16 pb-20 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div
              variants={itemAnimation}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-50">
                  Olá, {user?.name?.split(' ')[0] || 'Bem-vindo'}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {isClient 
                    ? 'Gerencie seus agendamentos e encontre os melhores salões.' 
                    : 'Gerencie seus agendamentos e acompanhe o seu salão.'}
                </p>
              </div>
              
              <Button className="bg-salon-500 hover:bg-salon-600">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isClient ? 'Novo agendamento' : 'Adicionar horário'}
              </Button>
            </motion.div>
            
            <motion.div 
              variants={itemAnimation}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    {isClient ? 'Agendamentos futuros' : 'Atendimentos hoje'}
                    <Calendar className="h-4 w-4 ml-2 text-salon-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isClient ? upcomingAppointments.length : '8'}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    {isClient ? 'Salões favoritos' : 'Total de clientes'}
                    <User className="h-4 w-4 ml-2 text-salon-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isClient ? '3' : '42'}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    {isClient ? 'Avaliações feitas' : 'Avaliação média'}
                    <Star className="h-4 w-4 ml-2 text-salon-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {isClient ? '7' : '4.8'}
                    {!isClient && <span className="text-sm text-gray-500 ml-1">/5</span>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemAnimation}>
              <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Próximos agendamentos</CardTitle>
                    <Button variant="ghost" size="sm" className="text-salon-500 hover:text-salon-600">
                      <List className="h-4 w-4 mr-2" />
                      Ver todos
                    </Button>
                  </div>
                  <CardDescription>
                    {isClient
                      ? 'Seus agendamentos futuros em salões'
                      : 'Agendamentos de clientes no seu salão'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-900 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center">
                            <div className="rounded-full bg-salon-100 p-2 mr-4">
                              <Calendar className="h-5 w-5 text-salon-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.service}</h3>
                              <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-4">
                                <span className="flex items-center">
                                  <User className="h-3.5 w-3.5 mr-1" />
                                  {appointment.professional}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  {formatDate(appointment.date)}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex border-salon-500 text-salon-500 hover:bg-salon-50"
                          >
                            Detalhes
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">Nenhum agendamento futuro encontrado.</p>
                      <Button>
                        {isClient ? 'Agendar agora' : 'Adicionar horário disponível'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemAnimation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isClient ? (
                <>
                  <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle>Salões populares</CardTitle>
                      <CardDescription>Salões bem avaliados na sua região</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <Scissors className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Salão Glamour</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>4.9 (120 avaliações)</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-salon-500 border-salon-500">Ver</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <Scissors className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Bela Hair</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>4.7 (86 avaliações)</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-salon-500 border-salon-500">Ver</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-salon-500 to-salon-600 shadow-md border-none text-white">
                    <CardHeader>
                      <CardTitle>Encontre novos salões</CardTitle>
                      <CardDescription className="text-white/80">
                        Descubra os melhores salões perto de você
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-white text-salon-600 hover:bg-gray-100 mt-4">
                        <Search className="h-4 w-4 mr-2" />
                        Buscar salões
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="bg-white shadow-md border-none dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle>Desempenho do mês</CardTitle>
                      <CardDescription>Outubro 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3">
                          <p className="text-sm text-gray-500 mb-1">Agendamentos</p>
                          <p className="text-lg font-bold">127</p>
                          <p className="text-xs text-green-500">+12% do mês anterior</p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <p className="text-sm text-gray-500 mb-1">Receita</p>
                          <p className="text-lg font-bold">R$ 4.250</p>
                          <p className="text-xs text-green-500">+8% do mês anterior</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-salon-500 to-salon-600 shadow-md border-none text-white">
                    <CardHeader>
                      <CardTitle>Cadastre novos funcionários</CardTitle>
                      <CardDescription className="text-white/80">
                        Adicione profissionais e serviços ao seu salão
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-white text-salon-600 hover:bg-gray-100 mt-4">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar profissional
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
