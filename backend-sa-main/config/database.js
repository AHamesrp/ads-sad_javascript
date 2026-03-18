// config/database.js - Versão Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórios no arquivo .env');
}

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Função para testar conexão
const connectDB = async () => {
  try {
    // Testar conexão fazendo uma query simples
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error && error.code !== '42P01') { // 42P01 = relation does not exist
      throw error;
    }
    
    console.log('✅ Supabase conectado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error.message);
    
    // Se for erro de tabela não existir, apenas avisar
    if (error.code === '42P01') {
      console.log('⚠️ Tabelas ainda não criadas no Supabase. Execute as migrations primeiro.');
      return true;
    }
    
    throw error;
  }
};

// Função para criar tabelas (migrations básicas)
const createTables = async () => {
  try {
    console.log('🔨 Criando tabelas no Supabase...');
    
    // Criar tabela users
    await supabase.rpc('create_tables_if_not_exists');
    
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  createTables,
  supabase
};