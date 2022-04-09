const medicEventName = "medic::greetings!";
const leaderEventName = "medic::leader_greetings";

module.exports = (App) => {
	const medics = App.addGroup("medics");
	medics.use(medicMiddlware);
	medics.addEvent(medicEventName, medicEnterCar);
	medics.addEvent(medicEventName, medicEnterWarehouse);
	medics.addEvent(medicEventName, medicGreetings);
	medics.addEvent(medicEventName, medicShout);

	const medicLeaderGroup = medics.addGroup("medicLeader");
	medicLeaderGroup.use(medicLeaderMiddleWare);
	medicLeaderGroup.addEvent(leaderEventName, leaderCar);
	medicLeaderGroup.addEvent(leaderEventName, leaderExplode);
	medicLeaderGroup.addEvent(leaderEventName, leaderGreetings);
	medicLeaderGroup.addEvent(leaderEventName, leaderRatio);

	// Tests
	TestMedics(medicEventName);
	TestMedicLeader(leaderEventName);
}

const medicMiddlware = (source, args, next) => {
	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию медиков!`);
	next();
}

function medicGreetings(player) {
	console.log(`"Медик ${player.name}" поздоровался со всеми в чате медиков!`);
}

function medicEnterCar(player) {
	console.log(`"Медик ${player.name}" сел в машину медиков!`);
}

function medicEnterWarehouse(player) {
	console.log(`Медик "${player.name}" зашел на склад медиков!`);
}

function medicShout(player) {
	console.log(`Медик "${player.name}" крикнул что-то на медицинском!`);
}

const medicLeaderMiddleWare = (source, args, next) => {
	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию лидеров медиков!`);
	next();
}

function leaderGreetings(player) {
	console.log(`Лидер "${player.name}" поздоровался со всеми в чате медиков!`);
}

function leaderRatio(player) {
	console.log(`Лидер "${player.name}" поздоровался со всеми в рации!`);
}

function leaderCar(player) {
	console.log(`Лидер "${player.name}" сел в авто лидеров!`);
}

function leaderExplode(player) {
	console.log(`Лидер "${player.name}" взорвался!`);
}

function TestMedics(eventName) {
	const testData = [
		{
			name: "Медик 1",
			isMedic: false,
		},
		{
			name: "Медик 2",
			isMedic: true,
		},
	];

	for(let i = 0; i < testData.length; i++) {
		const data = testData[i];
		mp.events.call(eventName, data);
	}
}

function TestMedicLeader(eventName) {
	const testData = [
		{
			name: "Медик 3",
			isMedic: false,
			isMedicLeader: false,
		},
		{
			name: "Медик 4",
			isMedic: false,
			isMedicLeader: true,
		},
		{
			name: "Медик 5",
			isMedic: true,
			isMedicLeader: false,
		},
		{
			name: "Медик 6",
			isMedic: true,
			isMedicLeader: true,
		}
	];

	for(let i = 0; i < testData.length; i++) {
		const data = testData[i];
		mp.events.call(eventName, data);
	}
}