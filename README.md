# RageMP Server Middlewares

Данный пример промежуточных функций разработан, чтобы любые другие разработчики могли им пользоваться.

## Документация:

### App

**App** - это приложение, которое регистрирует события.
В идеале регистрировать её прямо в точке входа при запуске сервера.
Проще говоря, прям в самом начала index.js в Вашем проекте.

**Пример**
```JavaScript
const RageApp = require("./middlewares/app.js");

const app = new RageApp({alertAllNoAppEvents: true});
```

**new RageApp(flags)**

* *flags* - объект, пока что с единственным полем alertAllNoAppEvents. Данный флаг отвечает за вывод ВСЕХ СОБЫТИЙ, который зарегистрированы не через RageApp. 

**function middleware(source, args, next)**
* *source* - это источник, который вызвал событие. Например, игрок или автомобиль (всегда идет первым аргументом в ивенте).
* *args* - это аргументы, которые идут после источника события.
* *next* - это функция, которая не принимает в себя НИЧЕГО. После неё так же можно использовать другие методы, это не return. Данная функция просто говорит о том, что можно идти к следующему middleware и все условия выполнены.


**Пример**
```JavaScript
const medicMiddlware = (source, args, next) => {
	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию медиков!`);
	next();
	console.log("Хаха я могу продолжить код после вызова next()");
}
```

**Методы RageApp**
* *use(...middleware)* - принимает в себя множество функций middleware.
* *addEvent(name, callback, ...middlewares) return RageEvent* - принимает в себя название события, обработчик события и список промежуточных функций, который будет обработан в порядке очереди (после приложения/группы) с начала до конца. 
* *addGroup(name) return RageGroup* - создать группу событий с именем. В данном случае, приложение будет родительской группой над созданной.

**Методы RageGroup**
* *use(...middleware)* - принимает в себя множество функций middleware.
* *addEvent(name, callback, ...middlewares) return RageEvent* - принимает в себя название события, обработчик события и список промежуточных функций, который будет обработан в порядке очереди (после приложения/группы) с начала до конца. 
* *addGroup(name) return RageGroup* - создать группу событий с именем. В данном случае, текущий Group будет родительским над созданной.

**Методы RageEvent** 
* *use(...middleware)* - принимает в себя множество функций middleware.

## Вопросы и ответы:

### Почему?
```
Скажу честно - я поработал уже не в одном проекте GTA 5 за 3 года, и сейчас не связан ни с одним.
Моя цель - помочь, чтобы люди меньше говнокодили и могли делать больше прикольных вещей.
Мне было скучно, и я решил привнести что-то современное в RageMP разработку.
```

### Что такое Middleware?
```
Middleware (промежуточное или связующее программное обеспечение) — это фрагмент кода в конвейере приложения, используемый для обработки запросов и ответов. (с)
```

### А по-человечески?
```
Проще говоря, в представлении данного примера, Middleware - это промежуточная функция/группа функций/целое приложение, которое позволит корректно обрабатывать запросы, не дублируя код..
```

### Продолжай...
```
Чтобы не тянуть кота за шевелюру, объясню на примере.
Если сравнить medic/index.js и medic/index_with_shit.js мы можем увидеть разницу между использование промежуточных функций и их отсутствием.
Количество бессмысленных повторяющихся строк примерно на 30% меньше. 
```

### Так в чем смысл-то? Я не посмотрел файлы/тупой
```
Проще говоря, с помощью промежуточных функций можно единожды задать условие и не проверять в каждом событии, выполнено ли условие.
Таким образом, если у вас много-много систем, промежуточные функции можно объявить в группе и каждый раз не проверять, например, авторизован ли игрок.

Единожды в приложении прописав app.use(loginMiddleware), все следующие ивенты, где просто будет проверяться, авторизован ли игрок, Вам не придется писать это в каждом событии, а лишь перед регистрацией ивента.
```

### А как это работает?
```
Объясню на пальцах. У нас есть приложение - RageApp.
Мы создаем через new RageApp это приложение и уже к нему или к группам событий привязываем ивенты и промежуточные функции.
```

### Что за группы?
```
Тут была диллема, я её решил максимальной гибкостью.

Группы ивентов - это группы, у которых могут быть общие промежуточные функции.
Группа является либо частью приложения, либо другой группы.

Таким образом, Вы можете создать группу событий для игроков, объектов и автомобилей, задав им разные Middleware.
```

### Так, а в каком порядке это работает вообще? Вот я написал app.use, значит что?
```
Это значит то, что ВСЕ следующие ивенты будут проверяться с помощью твоей промежуточной функции.
Тебе нужно смотреть от точки входа, где ты инициализируешь это и дальше. 

На предудыщие ивенты, которые ранее зарегистрированы (до использования app.use) промежуточные функции распространяться не будут. 
```

### Могу ли я привязать middleware к конкретному событию, группе или всему приложению?
```
Да, можешь, но есть пара нюансов:

- Если ты привяжешь middleware к конкретному событию - все будет тип-топ и работать сразу.

- Если ты привяжешь middleware к группе событий, у которой, есть ещё другие группы, то это применится для ВСЕХ ДОЧЕРНИХ групп.
Для старых ивентов в этих группах это применяться не будет. 
Это будет применяться ТОЛЬКО при следующем СОЗДАНИИ события в дочерней группе.

- Если ты привяжешь middleware к приложению, то это применится ко всему приложению и группам. Сам же этот Middleware начнет действовать ТОЛЬКО В НОВЫХ событиях, 
которые будут регистрироваться app.use.
```

### Если ещё не взорвалась голова
```
Данная штука при хорошем подходе довольно мощная. 
В неё можно запихать как логирование событий, так и правильно устанавливать права доступа для событий.
Что только в голову взбредет!
```