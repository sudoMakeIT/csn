db.createUser(
	{
		user: "bruno",
		pwd: "bruno123",
		roles: [
			{
				role: "readWrite",
				db: "cnsDB"
			}
		]
	}
);

db.createCollection('aff', { capped: false });
db.createCollection('contacts', { capped: false });
db.createCollection('services', { capped: false });
db.createCollection('others', { capped: false });

//Aff
db.aff.save({ link: "", name: "", text: "", img: "scapelogo.webp" })

//Contacts
db.contacts.save(
	{
		toWhat: "Morada",
		icon: "fas fa-map-marked-alt",
		text1: "",
		text2: ""
	})

db.contacts.save(
	{
		toWhat: "Telefone",
		icon: "fas fa-mobile-alt",
		text1: "",
		text2: ""
	})

db.contacts.save(
	{
		toWhat: "Email",
		icon: "fas fa-envelope-open-text",
		text1: "",
		text2: ""
	})

//Services

db.services.save({
	path: "/img/i1.png",
	title: "",
	desc: ""
})

db.services.save({
	path: "/img/i2.png",
	title: "",
	desc: ""
})

db.services.save({
	path: "/img/i3.png",
	title: "",
	desc: ""
})

db.services.save({
	path: "/img/i4.png",
	title: "",
	desc: ""
})

//others
db.others.save(

	{
		title: "",
		text: ""
	}
)