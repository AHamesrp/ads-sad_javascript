import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (dateString) => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  
  if (isToday(date)) {
    return 'Hoje';
  }
  if (isTomorrow(date)) {
    return 'Amanhã';
  }
  if (isThisWeek(date)) {
    return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
  }
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours}h${minutes}`;
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatDistance = (km) => {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(1)}k km`;
  }
  return `${km} km`;
};

export const formatCO2 = (grams) => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)} kg`;
  }
  return `${grams} g`;
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const calculateCO2Saved = (distance, passengers = 1) => {
  const emissionPerKm = 0.12;
  return (distance * emissionPerKm * passengers).toFixed(2);
};

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];
