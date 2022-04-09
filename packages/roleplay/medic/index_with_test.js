const eventPlayerEnterMarker		= "medic::enter_marker"

const eventMedicEnterCar 				= "medic::enter_car";
const eventMedicEnterWarehouse 	= "medic::enter_warehouse";
const eventMedicGreetings 			= "medic::greetings";
const eventMedicShout 					= "medic::shout";

const eventLeaderMedicLeaderCar = "medic::leader_car";
const eventLeaderMedicExplode 	= "medic::leader_explode";
const eventLeaderMedicGreetings = "medic::leader_greetings";
const eventLeaderMedicRatio 		= "medic::leader_ratio";

module.exports = (App) => {
	const medics = App.addGroup("medics");
	medics.use(loginMiddleware);
	medics.addEvent(eventPlayerEnterMarker,		playerEnterMarker);
	medics.use(medicMiddlware);
	medics.addEvent(eventMedicEnterCar, 			medicEnterCar);
	medics.addEvent(eventMedicEnterWarehouse, medicEnterWarehouse);
	medics.addEvent(eventMedicGreetings, 			medicGreetings);
	medics.addEvent(eventMedicShout, 					medicShout);

	const medicLeaderGroup = medics.addGroup("medicLeader");
	medicLeaderGroup.use(medicLeaderMiddleWare);
	medicLeaderGroup.addEvent(eventLeaderMedicLeaderCar, 	leaderCar);
	medicLeaderGroup.addEvent(eventLeaderMedicExplode, 		leaderExplode);
	medicLeaderGroup.addEvent(eventLeaderMedicGreetings, 	leaderGreetings);
	medicLeaderGroup.addEvent(eventLeaderMedicRatio, 			leaderRatio);

	// Tests
	TestMedics(eventMedicEnterCar);
	TestMedicLeader(eventLeaderMedicLeaderCar);
	TestLogged(eventPlayerEnterMarker);
}

const loginMiddleware = (source, args, next, eventName) => {
	if(!source.logged) {
		console.log(`"${source.name}" попытался сделать ${eventName}, доступное для медиков, но он не авторизован и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию авторизованных игроков ${eventName}!`);
	next();
}

const medicMiddlware = (source, args, next, eventName) => {
	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать ${eventName}, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию медиков ${eventName}!`);
	next();
}

function playerEnterMarker(player) {
	console.log(`Игрок ${player.name} встал на маркер!`);
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

const medicLeaderMiddleWare = (source, args, next, eventName) => {
	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать ${eventName}, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}
	console.log(`"${source.name}" прошел через промежуточную функцию лидеров медиков ${eventName}!`);
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

function TestLogged(eventName) {
	const testData = [
		{
			name: "Медик 7",
			isMedic: false,
			isMedicLeader: false,
			logged: false,
		},
		{
			name: "Медик 8",
			isMedic: false,
			isMedicLeader: true,
			logged: false,
		},
		{
			name: "Медик 9",
			isMedic: true,
			isMedicLeader: false,
			logged: true,
		},
		{
			name: "Медик 10",
			isMedic: true,
			isMedicLeader: true,
			logged: true,
		}
	];

	for(let i = 0; i < testData.length; i++) {
		const data = testData[i];
		mp.events.call(eventName, data);
	}
}