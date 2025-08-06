import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Newspaper, 
  CheckSquare,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Eye,
  UserCheck,
  Medal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';
import ModernBackground from '../components/ModernBackground';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('cadets');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatoon, setSelectedPlatoon] = useState('all');
  const [selectedSquad, setSelectedSquad] = useState('all');

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Доступ запрещен</h2>
          <p className="text-blue-200">У вас нет прав для доступа к административной панели</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'cadets', name: 'Кадеты', icon: Users },
    { key: 'scores', name: 'Баллы', icon: Award },
    { key: 'news', name: 'Новости', icon: Newspaper },
    { key: 'tasks', name: 'Задания', icon: CheckSquare },
    { key: 'achievements', name: 'Достижения', icon: Medal },
  ];

  const mockCadets = [
    { id: '1', name: 'Иванов Александр Дмитриевич', platoon: '10-1', squad: 1, totalScore: 275, email: 'ivanov@nkkk.ru', phone: '+7 (918) 123-45-67' },
    { id: '2', name: 'Петров Михаил Андреевич', platoon: '10-1', squad: 2, totalScore: 271, email: 'petrov@nkkk.ru', phone: '+7 (918) 234-56-78' },
    { id: '3', name: 'Сидоров Дмитрий Владимирович', platoon: '9-2', squad: 1, totalScore: 267, email: 'sidorov@nkkk.ru', phone: '+7 (918) 345-67-89' },
    { id: '4', name: 'Козлов Артём Сергеевич', platoon: '11-1', squad: 3, totalScore: 266, email: 'kozlov@nkkk.ru', phone: '+7 (918) 456-78-90' },
    { id: '5', name: 'Морозов Владислав Игоревич', platoon: '8-1', squad: 2, totalScore: 261, email: 'morozov@nkkk.ru', phone: '+7 (918) 567-89-01' },
  ];

  const mockNews = [
    { id: '1', title: 'Торжественное построение', isMain: true, date: '2024-02-23' },
    { id: '2', title: 'Победа в соревнованиях', isMain: false, date: '2024-02-20' },
    { id: '3', title: 'Открытие библиотеки', isMain: false, date: '2024-02-15' },
  ];

  const platoons = ['7-1', '7-2', '8-1', '8-2', '9-1', '9-2', '10-1', '10-2', '11-1', '11-2'];
  const squads = [1, 2, 3];

  const filteredCadets = mockCadets.filter(cadet => {
    const matchesSearch = cadet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cadet.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatoon = selectedPlatoon === 'all' || cadet.platoon === selectedPlatoon;
    const matchesSquad = selectedSquad === 'all' || cadet.squad.toString() === selectedSquad;
    return matchesSearch && matchesPlatoon && matchesSquad;
  });

  const renderCadetsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Управление кадетами</h3>
        <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" />
          <span>Добавить кадета</span>
        </button>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск по имени или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
            <select
              value={selectedPlatoon}
              onChange={(e) => setSelectedPlatoon(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">Все взводы</option>
              {platoons.map(platoon => (
                <option key={platoon} value={platoon}>{platoon} взвод</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedSquad}
              onChange={(e) => setSelectedSquad(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">Все отделения</option>
              {squads.map(squad => (
                <option key={squad} value={squad.toString()}>{squad} отделение</option>
              ))}
            </select>
          </div>
          <div className="text-white font-semibold flex items-center justify-center">
            Найдено: {filteredCadets.length}
          </div>
        </div>
      </motion.div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Кадет
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Взвод/Отделение
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Контакты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Баллы
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredCadets.map((cadet) => (
                <motion.tr 
                  key={cadet.id} 
                  className="hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-white">{cadet.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-200">
                    {cadet.platoon}-{cadet.squad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-200">
                    <div className="text-sm">
                      <div>{cadet.email}</div>
                      <div className="text-xs text-blue-300">{cadet.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-400 font-bold">
                    {cadet.totalScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderScoresTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Управление баллами</h3>
        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-blue-900 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" />
          <span>Начислить баллы</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Учёба</h4>
            <Award className="h-8 w-8 text-blue-200" />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Имя кадета"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-blue-200 text-sm"
            />
            <input
              type="number"
              placeholder="Баллы"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-blue-200 text-sm"
            />
            <input
              type="text"
              placeholder="Описание"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-blue-200 text-sm"
            />
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded font-semibold transition-colors">
              Начислить
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Дисциплина</h4>
            <Award className="h-8 w-8 text-red-200" />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Имя кадета"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-red-200 text-sm"
            />
            <input
              type="number"
              placeholder="Баллы"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-red-200 text-sm"
            />
            <input
              type="text"
              placeholder="Описание"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-red-200 text-sm"
            />
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded font-semibold transition-colors">
              Начислить
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Мероприятия</h4>
            <Award className="h-8 w-8 text-green-200" />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Имя кадета"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-green-200 text-sm"
            />
            <input
              type="number"
              placeholder="Баллы"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-green-200 text-sm"
            />
            <input
              type="text"
              placeholder="Описание"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-green-200 text-sm"
            />
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded font-semibold transition-colors">
              Начислить
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderNewsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Управление новостями</h3>
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" />
          <span>Создать новость</span>
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Заголовок
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockNews.map((news) => (
                <tr key={news.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{news.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      news.isMain ? 'bg-yellow-400 text-black' : 'bg-blue-400/20 text-blue-300'
                    }`}>
                      {news.isMain ? 'Главная' : 'Обычная'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-200">{news.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Управление заданиями</h3>
        <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" />
          <span>Создать задание</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">На проверке</h4>
            <div className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
              3
            </div>
          </div>
          <p className="text-blue-200 mb-4">Задания, ожидающие проверки администратором</p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Проверить
          </button>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Активные</h4>
            <div className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
              12
            </div>
          </div>
          <p className="text-blue-200 mb-4">Задания, доступные для выполнения кадетами</p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Управлять
          </button>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Завершенные</h4>
            <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              48
            </div>
          </div>
          <p className="text-blue-200 mb-4">Успешно выполненные задания</p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Просмотреть
          </button>
        </motion.div>
      </div>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Управление достижениями</h3>
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" />
          <span>Создать достижение</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Выдать достижение</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Кадет</label>
              <select className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white">
                <option value="">Выберите кадета</option>
                {mockCadets.map(cadet => (
                  <option key={cadet.id} value={cadet.id}>{cadet.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Название достижения</label>
              <input
                type="text"
                placeholder="Например: Лучший в учёбе"
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Описание</label>
              <textarea
                placeholder="Описание достижения..."
                rows={3}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-blue-300 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Категория</label>
              <select className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white">
                <option value="study">Учёба</option>
                <option value="discipline">Дисциплина</option>
                <option value="events">Мероприятия</option>
                <option value="leadership">Лидерство</option>
                <option value="sports">Спорт</option>
              </select>
            </div>
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-all">
              Выдать достижение
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Последние достижения</h4>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Лучший в учёбе</span>
                <span className="text-xs text-blue-300">2024-03-15</span>
              </div>
              <p className="text-blue-200 text-sm">Иванов Александр Дмитриевич</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Командир месяца</span>
                <span className="text-xs text-blue-300">2024-03-10</span>
              </div>
              <p className="text-blue-200 text-sm">Петров Михаил Андреевич</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Спортивные достижения</span>
                <span className="text-xs text-blue-300">2024-03-08</span>
              </div>
              <p className="text-blue-200 text-sm">Сидоров Дмитрий Владимирович</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  const renderTabContent = () => {
    switch (activeTab) {
      case 'cadets': return renderCadetsTab();
      case 'scores': return renderScoresTab();
      case 'news': return renderNewsTab();
      case 'tasks': return renderTasksTab();
      case 'achievements': return renderAchievementsTab();
      default: return renderCadetsTab();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      <ParticleBackground />
      <ModernBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 z-10"></div>
      
      <div className="relative z-20 section-padding">
        <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-display font-black mb-6 text-gradient text-glow">
            Административная панель
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto text-shadow text-balance">
            Управление системой рейтинга кадетов
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12 overflow-x-auto"
        >
          {tabs.map(({ key, name, icon: Icon }) => (
            <motion.button
              key={key}
              variants={staggerItem}
              onClick={() => setActiveTab(key)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl ${
                activeTab === key
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-blue-900 shadow-yellow-500/25 scale-105'
                  : 'glass-effect text-white hover:bg-white/20'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderTabContent()}
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPage;