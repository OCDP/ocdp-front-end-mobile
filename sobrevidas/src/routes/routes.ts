import BemVindoPage from '../pages/BemVindoPage/BemVindoPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';
import CadastrarPacientePage from '../pages/CadastrarPacientePage/CadastrarPacientePage';
import CadastrarResultadosPage from '../pages/CadastrarResultadosPage/CadastrarResultadosPage';
import PerfilUsuarioPage from '../pages/PerfilUsuarioPage/PerfilUsuarioPage';
import HistoricoPage from '../pages/HistoricoPage/HistoricoPage';
import DadosPacientePage from '../pages/DadosPacientePage/DadosPacientePage';
import CadastroFeedbackPage from '../pages/CadastroFeedbackPage/CadastroFeedbackPage';
import RegistrarAtendimentoPage from '../pages/RegistrarAtendimentoPage/RegistrarAtendimentoPage';

export const routes = [
  {
    name: 'BemVindoPage',
    component: BemVindoPage,
  },
  {
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    name: 'HomePage',
    component: HomePage,
  },
  {
    name: 'CadastrarPacientePage',
    component: CadastrarPacientePage,
  },
  {
    name: 'CadastrarResultadosPage',
    component: CadastrarResultadosPage,
  },
  {
    name: 'PerfilUsuarioPage',
    component: PerfilUsuarioPage,
  },
  {
    name: 'HistoricoPage',
    component: HistoricoPage,
  },
  {
    name: 'DadosPacientePage',
    component: DadosPacientePage,
  },
  {
    name: 'CadastroFeedbackPage',
    component: CadastroFeedbackPage,
  },
  {
    name: 'RegistrarAtendimentoPage',
    component: RegistrarAtendimentoPage,
  },
];
