import BemVindoPage from '../pages/BemVindoPage/BemVindoPage';
import CadastrarPacientePage from '../pages/CadastrarPacientePage/CadastrarPacientePage';
import CadastrarResultadosPage from '../pages/CadastrarResultadosPage/CadastrarResultadosPage';
import DadosPacientePage from '../pages/DadosPacientePage/DadosPacientePage';
import HistoricoPage from '../pages/HistoricoPage/HistoricoPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PerfilUsuarioPage from '../pages/PerfilUsuarioPage/PerfilUsuarioPage';

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
];
