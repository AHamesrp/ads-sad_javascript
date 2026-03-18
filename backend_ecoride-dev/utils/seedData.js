require('dotenv').config();
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'PRESENTE' : 'AUSENTE');
const { supabase } = require('../config/database');

const seedData = async () => {
  try {
    console.log('🔗 Conectando ao Supabase...');
    
    // Limpar dados existentes
    console.log('🗑️ Removendo dados antigos...');
    await supabase.from('ride_passengers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('rides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('✅ Dados antigos removidos');
    
    // Criar usuários diretamente na tabela (sem Auth)
    console.log('👤 Criando usuários...');
    
    const { data: users, error: usersError } = await supabase
  .from('users')
  .insert([
    {
      // Remover o campo 'id' - deixar o Supabase gerar automaticamente
      name: 'Maria Silva',
      email: 'maria@example.com',
      phone: '(11) 99999-1234',
      rating_average: 4.9,
      rating_count: 127,
      total_trips: 127
    },
    {
      name: 'João Santos', 
      email: 'joao@example.com',
      phone: '(11) 98888-5678',
      rating_average: 4.8,
      rating_count: 89,
      total_trips: 89
    },
    {
      name: 'Ana Costa',
      email: 'ana@example.com', 
      phone: '(31) 97777-9012',
      rating_average: 5.0,
      rating_count: 156,
      total_trips: 156
    }
  ])
  .select();

    if (usersError) throw usersError;
    
    console.log(`✅ ${users.length} usuários criados`);

    // Criar caronas de exemplo
console.log('🚗 Criando caronas...');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 5);

const ridesData = [
  {
    driver_id: users[0].id,
    origin_city: 'São Paulo',
    origin_state: 'SP',
    destination_city: 'Rio de Janeiro', 
    destination_state: 'RJ',
    departure_date: new Date().toISOString().split('T')[0],
    departure_time: '14:30',
    available_seats: 3,
    original_seats: 3,
    price_per_seat: 65.00,
    vehicle_model: 'Honda Civic',
    vehicle_color: 'Branco',
    distance: 430,
    description: 'Viagem tranquila, ar condicionado',
    status: 'active'
  },
  {
    driver_id: users[1].id,
    origin_city: 'Campinas',
    origin_state: 'SP', 
    destination_city: 'São Paulo',
    destination_state: 'SP',
    departure_date: tomorrow.toISOString().split('T')[0],
    departure_time: '07:00',
    available_seats: 2,
    original_seats: 2,
    price_per_seat: 25.00,
    vehicle_model: 'Toyota Corolla',
    vehicle_color: 'Prata',
    distance: 100,
    description: 'Carona para trabalho',
    status: 'active'
  },
  {
    driver_id: users[2].id,
    origin_city: 'Belo Horizonte',
    origin_state: 'MG',
    destination_city: 'Brasília',
    destination_state: 'DF', 
    departure_date: futureDate.toISOString().split('T')[0],
    departure_time: '16:00',
    available_seats: 4,
    original_seats: 4,
    price_per_seat: 85.00,
    vehicle_model: 'Volkswagen Jetta',
    vehicle_color: 'Azul',
    distance: 520,
    description: 'Viagem de fim de semana',
    status: 'active'
  }
];

console.log('Dados das caronas:', JSON.stringify(ridesData, null, 2));

const { data: rides, error: ridesError } = await supabase
  .from('rides')
  .insert(ridesData)
  .select();

if (ridesError) throw ridesError;

    console.log(`✅ ${rides.length} caronas criadas`);
    console.log('🎉 Dados de exemplo criados com sucesso!');
    
    console.log(`
📊 RESUMO:
- Usuários: ${users.length}
- Caronas: ${rides.length}

👤 USUÁRIOS CRIADOS:
- maria@example.com (ID: user-1-maria-silva)
- joao@example.com (ID: user-2-joao-santos)  
- ana@example.com (ID: user-3-ana-costa)

🚗 CARONAS DISPONÍVEIS:
- São Paulo → Rio de Janeiro (hoje 14:30)
- Campinas → São Paulo (amanhã 07:00)
- Belo Horizonte → Brasília (em 5 dias)
    `);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar dados:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;