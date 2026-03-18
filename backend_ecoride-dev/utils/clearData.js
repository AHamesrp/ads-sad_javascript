const { supabase } = require('../config/database');
require('dotenv').config();

const clearData = async () => {
  try {
    console.log('🔗 Conectando ao Supabase...');
    
    console.log('🗑️ Limpando banco de dados...');
    
    // Deletar dados em ordem (devido às foreign keys)
    console.log('Removendo notificações...');
    await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('Removendo reservas de passageiros...');
    await supabase.from('ride_passengers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('Removendo caronas...');
    await supabase.from('rides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('Removendo usuários...');
    await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Limpar usuários do Auth também
    console.log('Limpando Supabase Auth...');
    try {
      // Listar todos os usuários do auth
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      
      if (listError) {
        console.log('⚠️ Não foi possível limpar Auth users (pode precisar de permissões de admin)');
      } else {
        // Deletar cada usuário do auth
        for (const user of users) {
          await supabase.auth.admin.deleteUser(user.id);
        }
        console.log(`Removidos ${users.length} usuários do Auth`);
      }
    } catch (authError) {
      console.log('⚠️ Erro ao limpar Auth users:', authError.message);
    }
    
    console.log('✅ Banco de dados limpo com sucesso!');
    
    // Verificar se realmente limpou
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: rideCount } = await supabase.from('rides').select('*', { count: 'exact', head: true });
    
    console.log(`📊 Verificação: ${userCount} usuários, ${rideCount} caronas restantes`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar dados:', error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  clearData();
}

module.exports = clearData;