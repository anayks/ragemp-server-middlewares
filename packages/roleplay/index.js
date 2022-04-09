const RageApp = require("./middlewares/app.js");

const eventWithoutMiddlewares = "eventWithoutMiddlewares";
const eventWithFirstMiddleware = "eventWithFirstMiddleware";
const eventWithAllMiddlewares = "eventWithAllMiddlewares";

const app = new RageApp({
	alertAllNoAppEvents: true,
});

const eventTestStart = TestEventWithIncrement(eventWithoutMiddlewares, "Запрос без middleware");

app.addEvent(eventWithoutMiddlewares, (source, ...args) => {
	console.log(`Ивент ${eventWithoutMiddlewares} "${source.name}" выполнен!`);
});

eventTestStart();

app.use((source, args, next) => {
	console.log(`"${source.name}" прошел через первую промежуточную функцию!`);
	next();
});

app.addEvent(eventWithFirstMiddleware, (source, ...args) => {
	console.log(`Ивент ${eventWithFirstMiddleware} от "${source.name}" выполнен!`);
});

const eventTestStartFirst = TestEventWithIncrement(eventWithFirstMiddleware, "Запрос с одной middleware");

eventTestStartFirst();
eventTestStartFirst();

eventTestStart();

app.use((source, args, next) => {
	if(source.cancel) {
		console.error(`"${source.name}" выполнен не будет, так как он отменен во второй промежуточной функции.`);
		return;
	}

	console.log(`"${source.name}" прошел через вторую промежуточную функцию!`);
	next();
});

app.addEvent(eventWithAllMiddlewares, (source, ...args) => {
	console.log(`Ивент "${eventWithAllMiddlewares}" от "${source.name}" выполнен!`);
});

eventTestWithCancel = TestWithCancel(eventWithoutMiddlewares);

eventTestWithCancelAll = TestWithCancel(eventWithAllMiddlewares);
eventTestWithCancelAll();
eventTestWithCancelAll();


eventTestStart();
eventTestWithCancel();
CreateBadEvent();

require("./medic/index_with_test.js")(app);
eventTestWithCancel();

function TestEventWithIncrement(eventName, queryName) {
	let i = 0;
	return (() => {
		const testSource = {
			name: `${queryName} ${i}`,
		};

		i++;

		mp.events.call(eventName, testSource);
	})
}

function TestWithCancel(eventName) {
	let i = 0;

	return () => {
		const testSource = {
			name: `Запрос с отменой #${i} `,
			cancel: true,
		};

		i++;
	
		mp.events.call(eventName, testSource);
	}
}

function CreateBadEvent() {
	mp.events.add("bad event", () => {});
}