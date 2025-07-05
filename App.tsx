
import React, { useState, useCallback } from 'react';
import { Screen } from './types.ts';
import HomeScreen from './screens/HomeScreen.tsx';
import ChatbotScreen from './screens/ChatbotScreen.tsx';
import DocumentAssistantScreen from './screens/DocumentAssistantScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import SummarizerScreen from './screens/SummarizerScreen.tsx';
import JurisprudenceScreen from './screens/JurisprudenceScreen.tsx';
import AgendaScreen from './screens/AgendaScreen.tsx';
import BottomNav from './components/BottomNav.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authScreen, setAuthScreen] = useState<'login' | 'register'>('login');
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
    const [history, setHistory] = useState<Screen[]>([Screen.Home]);

    const navigateTo = useCallback((screen: Screen) => {
        if (screen !== currentScreen) {
            setHistory(prev => [...prev, screen]);
            setCurrentScreen(screen);
        }
    }, [currentScreen]);

    const goBack = useCallback(() => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);
            setCurrentScreen(newHistory[newHistory.length - 1]);
        }
    }, [history]);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setAuthScreen('login');
        setCurrentScreen(Screen.Home); 
        setHistory([Screen.Home]);
    }, []);
    
    if (!isAuthenticated) {
        if (authScreen === 'login') {
            return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} onNavigateToRegister={() => setAuthScreen('register')} />;
        }
        return <RegisterScreen onRegisterSuccess={() => setAuthScreen('login')} onNavigateToLogin={() => setAuthScreen('login')} />;
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.Home:
                return <HomeScreen navigateTo={navigateTo} />;
            case Screen.Chat:
                return <ChatbotScreen />;
            case Screen.DocumentAssistant:
                return <DocumentAssistantScreen />;
            case Screen.Profile:
                return <ProfileScreen onLogout={handleLogout} />;
            case Screen.Summarizer:
                return <SummarizerScreen goBack={goBack} />;
            case Screen.Jurisprudence:
                return <JurisprudenceScreen goBack={goBack} />;
            case Screen.Agenda:
                return <AgendaScreen goBack={goBack} />;
            default:
                return <HomeScreen navigateTo={navigateTo} />;
        }
    };

    const isBottomNavVisible = [Screen.Home, Screen.Chat, Screen.DocumentAssistant, Screen.Profile].includes(currentScreen);

    return (
        <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-gray-50">
            <main className="flex-1 overflow-y-auto pb-24">
                {renderScreen()}
            </main>
            {isBottomNavVisible && (
                <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
            )}
        </div>
    );
};

export default App;
