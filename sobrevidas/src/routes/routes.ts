import BemVindoPage from '../pages/BemVindoPage/BemVindoPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';
import CadastrarPacientePage from '../pages/CadastrarPacientePage/CadastrarPacientePage';
import CadastrarResultadosPage from '../pages/CadastrarResultadosPage/CadastrarResultadosPage';
import PerfilUsuarioPage from '../pages/PerfilUsuarioPage/PerfilUsuarioPage';
import HistoricoPage from '../pages/HistoricoPage/HistoricoPage';
import DadosPacientePage from '../pages/DadosPacientePage/DadosPacientePage';
import CadastroFeedback from '../pages/CadastroFeedback/CadastroFeedback';
import RegistrarAcompanhamento from '../pages/RegistrarAcompanhamento/RegistrarAcompanhamento';

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
    name: 'CadastroFeedback',
    component: CadastroFeedback,
  },
  {
    name: 'RegistrarAcompanhamento',
    component: RegistrarAcompanhamento,
  },
];
