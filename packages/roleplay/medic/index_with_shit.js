const eventPlayerEnterMarker		= "medic::enter_marker"

const eventMedicEnterCar 				= "medic::enter_car";
const eventMedicEnterWarehouse 	= "medic::enter_warehouse";
const eventMedicGreetings 			= "medic::greetings";
const eventMedicShout 					= "medic::shout";

const eventLeaderMedicLeaderCar = "medic::leader_car";
const eventLeaderMedicExplode 	= "medic::leader_explode";
const eventLeaderMedicGreetings = "medic::leader_greetings";
const eventLeaderMedicRatio 		= "medic::leader_ratio";

module.exports = () => {
	mp.events.add(eventPlayerEnterMarker, 		playerEnterMarker);
	mp.events.add(eventMedicEnterCar, 				medicEnterCar);
	mp.events.add(eventMedicEnterWarehouse, 	medicEnterWarehouse);
	mp.events.add(eventMedicGreetings, 				medicGreetings);
	mp.events.add(eventMedicShout, 						medicShout);
	mp.events.add(eventLeaderMedicLeaderCar, 	leaderCar);
	mp.events.add(eventLeaderMedicExplode, 		leaderExplode);
	mp.events.add(eventLeaderMedicGreetings, 	leaderGreetings);
	mp.events.add(eventLeaderMedicRatio, 			leaderRatio);
}

function playerEnterMarker(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не авторизован!`);
		return;
	}

	console.log(`Игрок ${player.name} встал на маркер!`);
}

function medicGreetings(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	console.log(`"Медик ${player.name}" поздоровался со всеми в чате медиков!`);
}

function medicEnterCar(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	console.log(`"Медик ${player.name}" сел в машину медиков!`);
}

function medicEnterWarehouse(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	console.log(`Медик "${player.name}" зашел на склад медиков!`);
}

function medicShout(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	console.log(`Медик "${player.name}" крикнул что-то на медицинском!`);
}

function leaderGreetings(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}

	console.log(`Лидер "${player.name}" поздоровался со всеми в чате медиков!`);
}

function leaderRatio(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}

	console.log(`Лидер "${player.name}" поздоровался со всеми в рации!`);
}

function leaderCar(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}

	console.log(`Лидер "${player.name}" сел в авто лидеров!`);
}

function leaderExplode(player) {
	if(!source.isLogged) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не авторизован!`);
		return;
	}

	if(!source.isMedic) {
		console.log(`"${source.name}" попытался сделать действие, доступное для медиков, но он не медик и ничего не получилось!`);
		return;
	}

	if(!source.isMedicLeader) {
		console.log(`"${source.name}" попытался сделать действие, доступное для лидера медиков, но он не лидер медиков и ничего не получилось!`);
		return;
	}

	console.log(`Лидер "${player.name}" взорвался!`);
}