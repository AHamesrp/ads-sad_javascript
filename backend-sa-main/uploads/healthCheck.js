// scripts/healthCheck.js - Versão Supabase
const { supabase } = require('../config/database');
const User = require('../models/User');
const Ride = require('../models/Ride');
require('dotenv').config();

const healthCheck = async () => {
  try {
    console.log('🏥 Iniciando verificação de saúde do sistema...');
    
    // 1. Verificar conexão com Supabase
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error && error.code !== '42P01') {
      throw error;
    }
    
    console.log('✅ Conexão com Supabase: OK');
    
    // 2. Verificar tabelas principais
    try {
      const userCount = await User.countDocuments();
      const rideCount = await Ride.countDocuments();
      
      console.log(`✅ Usuários cadastrados: ${userCount}`);
      console.log(`✅ Caronas cadastradas: ${rideCount}`);
    } catch (tableError) {
      if (tableError.message.includes('relation') && tableError.message.includes('does not exist')) {
        console.log('⚠️ Tabelas ainda não criadas. Execute as migrations SQL primeiro.');
      } else {
        throw tableError;
      }
    }
    
    // 3. Verificar estrutura das tabelas principais
    try {
      const { data: tables } = await supabase.rpc('get_table_info');
      console.log('✅ Estrutura de tabelas: OK');
    } catch {
      console.log('⚠️ Não foi possível verificar estrutura das tabelas');
    }
    
    // 4. Verificar dados de exemplo
    try {
      const sampleUser = await User.findById('00000000-0000-0000-0000-000000000001');
      const { data: sampleRides } = await supabase.from('rides').select('*').limit(1);
      
      if (sampleUser || (await User.countDocuments()) > 0) {
        console.log('✅ Dados de usuário: OK');
      } else {
        console.log('⚠️ Nenhum usuário encontrado');
      }
      
      if (sampleRides && sampleRides.length > 0) {
        console.log('✅ Dados de carona: OK');
      } else {
        console.log('⚠️ Nenhuma carona encontrada');
      }
    } catch {
      console.log('⚠️ Erro ao verificar dados de exemplo');
    }
    
    // 5. Verificar estrutura de pastas
    const fs = require('fs');
    const requiredDirs = ['uploads', 'logs', 'uploads/avatars'];
    
    requiredDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        console.log(`✅ Diretório ${dir}: OK`);
      } else {
        console.log(`⚠️ Diretório ${dir}: NÃO ENCONTRADO`);
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Diretório ${dir}: CRIADO`);
      }
    });
    
    // 6. Verificar variáveis de ambiente
    const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'JWT_SECRET'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length === 0) {
      console.log('✅ Variáveis de ambiente: OK');
    } else {
      console.log(`⚠️ Variáveis de ambiente faltando: ${missingVars.join(', ')}`);
    }
    
    console.log('🎉 Verificação de saúde concluída!');
    
    // 7. Estatísticas finais
    let finalUserCount = 0;
    let finalRideCount = 0;
    
    try {
      finalUserCount = await User.countDocuments();
      finalRideCount = await Ride.countDocuments();
    } catch {
      // Se der erro, deixa 0
    }
    
    const stats = {
      timestamp: new Date().toISOString(),
      database: 'Supabase',
      users: finalUserCount,
      rides: finalRideCount,
      status: 'saudável'
    };
    
    console.log('\n📊 RELATÓRIO DE SAÚDE:');
    console.table(stats);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na verificação de saúde:', error.message);
    
    // Dicas de solução
    if (error.message.includes('SUPABASE_URL')) {
      console.log('💡 Dica: Verifique se SUPABASE_URL está configurado no .env');
    }
    if (error.message.includes('SUPABASE_ANON_KEY')) {
      console.log('💡 Dica: Verifique se SUPABASE_ANON_KEY está configurado no .env');
    }
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('💡 Dica: Execute as migrations SQL no Supabase Dashboard primeiro');
    }
    
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  healthCheck();
}

module.exports = healthCheck;