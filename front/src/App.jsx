import './App.css'
import './styles/variables.css'
import {ConfigProvider} from 'antd'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {

  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#F2506E'
        }
      }}
    >
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </ConfigProvider>

  )
}

export default App
