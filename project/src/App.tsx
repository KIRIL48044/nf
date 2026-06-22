import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  Globe,
  Wallet,
  Headphones,
  Zap,
  Send,
  ShoppingBag,
  Star,
  ArrowLeft,
} from 'lucide-react';
import { products, type FormData, type Product } from './types';

type Page = 'home' | 'registration' | 'products' | 'order' | 'success';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    preferredName: '',
    age: '',
    city: '',
    dataConsent: false,
  });
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [pickupAddress, setPickupAddress] = useState('');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.find((p) => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const openTelegram = () => {
    window.open('https://t.me/mashawb1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 safe-area-bottom">
      {currentPage === 'home' && (
        <HomePage onContinue={() => setCurrentPage('registration')} />
      )}
      {currentPage === 'registration' && (
        <RegistrationPage
          formData={formData}
          setFormData={setFormData}
          onContinue={() => setCurrentPage('products')}
          onBack={() => setCurrentPage('home')}
        />
      )}
      {currentPage === 'products' && (
        <ProductsPage
          selectedProducts={selectedProducts}
          onProductSelect={handleProductSelect}
          onContinue={() => setCurrentPage('order')}
          onBack={() => setCurrentPage('registration')}
        />
      )}
      {currentPage === 'order' && (
        <OrderPage
          selectedProducts={selectedProducts}
          pickupAddress={pickupAddress}
          setPickupAddress={setPickupAddress}
          onConfirm={() => setCurrentPage('success')}
          onBack={() => setCurrentPage('products')}
        />
      )}
      {currentPage === 'success' && (
        <SuccessPage onTelegramClick={openTelegram} />
      )}
    </div>
  );
}

function HomePage({ onContinue }: { onContinue: () => void }) {
  const features = [
    { icon: Clock, text: 'Свободный график' },
    { icon: Globe, text: 'Работа онлайн' },
    { icon: Wallet, text: 'Быстрые выплаты' },
    { icon: Headphones, text: 'Поддержка менеджера' },
    { icon: Zap, text: 'Простые задания' },
  ];

  return (
    <div>
      <header className="gradient-primary px-6 pt-12 pb-16 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">WB</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">WB Agency</h1>
            <p className="text-white/80 text-sm">Отзывы, которые продают</p>
          </div>
        </div>
      </header>

      <div className="px-6 -mt-8 space-y-6 pb-32">
        <section className="card">
          <h2 className="text-lg font-semibold gradient-text mb-3">Что такое WB Отзывы?</h2>
          <p className="text-gray-600 leading-relaxed">
            WB Отзывы — это формат обратной связи покупателей о товарах маркетплейса.
            Мы помогаем продавцам получать качественные отзывы о товарах, чтобы покупатели
            могли принимать более взвешенные решения при выборе продукции.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold gradient-text mb-3">Оплата за отзывы</h2>
          <p className="text-gray-600 mb-2">За один выполненный отзыв:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full gradient-primary"></span>
              <span className="font-medium text-gray-900">от 500 до 1 000 рублей</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full gradient-primary"></span>
              <span className="font-medium text-gray-900">примерно от 2 500 до 6 500 тенге</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-3">
            Размер оплаты зависит от категории товара и сложности задания.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Преимущества</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="card flex flex-col items-center text-center py-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100 safe-area-bottom">
        <button onClick={onContinue} className="btn-primary w-full text-lg">
          Начать регистрацию
        </button>
      </div>
    </div>
  );
}

function RegistrationPage({
  formData,
  setFormData,
  onContinue,
  onBack,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  const isValid =
    formData.name.trim() &&
    formData.preferredName.trim() &&
    formData.age &&
    formData.city.trim() &&
    formData.dataConsent;

  return (
    <div className="px-6 py-8 pb-32">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>
      <h2 className="text-2xl font-bold gradient-text mb-6">Регистрация кандидата</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
          <input
            type="text"
            className="input-field"
            placeholder="Введите ваше имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Как к вам обращаться?
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Ваше предпочтительное обращение"
            value={formData.preferredName}
            onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Возраст</label>
          <input
            type="number"
            className="input-field"
            placeholder="18"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value ? Number(e.target.value) : '' })}
            min={18}
            max={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Город проживания</label>
          <input
            type="text"
            className="input-field"
            placeholder="Москва"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.dataConsent}
            onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600">
            Согласен на обработку персональных данных
          </span>
        </label>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100 safe-area-bottom">
        <button
          onClick={onContinue}
          disabled={!isValid}
          className="btn-primary w-full text-lg"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

function ProductsPage({
  selectedProducts,
  onProductSelect,
  onContinue,
  onBack,
}: {
  selectedProducts: Product[];
  onProductSelect: (product: Product) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="px-6 py-8 pb-32">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>
      <h2 className="text-2xl font-bold gradient-text mb-2">Выберите 3 товара</h2>
      <p className="text-gray-600 mb-6">
        Вы получаете товар за наш счет, для продолжения необходимо выбрать 3 товара.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => {
          const isSelected = selectedProducts.find((p) => p.id === product.id);
          return (
            <div
              key={product.id}
              onClick={() => onProductSelect(product)}
              className={`product-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                  <span className="font-bold gradient-text">
                    {product.newPrice} ₽
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Выбрано товаров:</span>
          <span className="font-semibold gradient-text">{selectedProducts.length} из 3</span>
        </div>
        <button
          onClick={onContinue}
          disabled={selectedProducts.length !== 3}
          className="btn-primary w-full text-lg"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

function OrderPage({
  selectedProducts,
  pickupAddress,
  setPickupAddress,
  onConfirm,
  onBack,
}: {
  selectedProducts: Product[];
  pickupAddress: string;
  setPickupAddress: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <div className="px-6 py-8 pb-32">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>
      <h2 className="text-2xl font-bold gradient-text mb-6">Оформление заказа</h2>

      <div className="space-y-4 mb-6">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="card flex items-center gap-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="font-bold gradient-text">0 ₽</p>
            </div>
            <ShoppingBag className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Стоимость товаров:</span>
            <span className="font-semibold">0 ₽</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Доставка:</span>
            <span className="font-semibold text-green-600">Бесплатно</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Срок выдачи:</span>
            <span className="font-semibold text-right">от 1 до 4 дней</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Адрес ПВЗ
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Введите адрес пункта выдачи"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100 safe-area-bottom">
        <button
          onClick={onConfirm}
          disabled={!pickupAddress.trim()}
          className="btn-primary w-full text-lg"
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}

function SuccessPage({ onTelegramClick }: { onTelegramClick: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-3xl font-bold gradient-text mb-4">Почти готово!</h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Для активации аккаунта и получения полной версии приложения свяжитесь с менеджером.
        </p>

        <div className="card mb-6 flex items-center gap-3">
          <Star className="w-8 h-8 text-accent-500" />
          <div className="text-left">
            <p className="font-semibold text-gray-900">@mashawb1</p>
            <p className="text-sm text-gray-500">Менеджер WB Agency</p>
          </div>
        </div>

        <button
          onClick={onTelegramClick}
          className="btn-primary w-full text-lg flex items-center justify-center gap-3"
        >
          <Send className="w-5 h-5" />
          Написать менеджеру
        </button>
      </div>
    </div>
  );
}

export default App;
