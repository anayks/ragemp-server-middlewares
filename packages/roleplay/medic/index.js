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