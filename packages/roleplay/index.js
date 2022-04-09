const RageApp = require("./middlewares/app.js");

const app = new RageApp({
	alertAllNoAppEvents: true,
});

const eventTestStart = TestEventWithIncrement();

app.addEvent("hey", (source, ...args) => {
	console.log(`Ивент "${source.name}" выполнен!`);
});

eventTestStart();

app.use((source, args, next) => {
	console.log(`"${source.name}" прошел через первую промежуточную функцию!`);
	next();
});

eventTestStart();

app.use((source, args, next) => {
	if(source.cancel) {
		console.error(`"${source.name}" выполнен не будет, так как он отменен во второй промежуточной функции.`);
		return;
	}

	console.log(`"${source.name}" прошел через вторую промежуточную функцию!`);
	next();
});

eventTestStart();
TestWithCancel();
CreateBadEvent();

require("./medic/index_with_test.js")(app);
TestWithCancel();

function TestWithCancel() {
	const test4Source = {
		name: "Запрос 4",
		cancel: true,
	};

	mp.events.call("hey", test4Source);
}

function TestEventWithIncrement() {
	let i = 0;
	return (() => {
		const testSource = {
			name: `Запрос ${i}`,
		};

		i++;

		mp.events.call("hey", testSource);
	})
}

function CreateBadEvent() {
	mp.events.add("bad event", () => {});
}