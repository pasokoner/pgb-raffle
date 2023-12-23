// src/db/seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { departments, employees } from "./schema";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const masterlist = [
	{
		fullName: "Ablao, Aries F.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Angeles, Millicent Mae R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Atentar, Helenet T.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Bantay, Ebenezer John R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Bantay, Tricia Camille B.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Barlis, Grace J.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Calaguas, Vilma B.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Camu, Alnie L.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Crisolo, Jessieleane M.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "David, Katlyn Kaye A.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "De Jesus, Jennifer B.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "De Jesus, Marissa G.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "De Luna, Nessie S.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Galdo, Nelia O.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Gallardo, Sherwin Joyce T.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Habagat, Ivy Michelle E.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Legaspi, Neriza R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Muli, Sheena R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Ortiguerra, Ameerah Zaela I.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Pantaleon, Fe D.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Perez, Mary Jean R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Pincil, Elena B.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Pizarro, Cristina R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Roman, Myrna B.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Salaveria, Aileen S.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Samson, Edmarie G.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Siasat, Leonora O.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Sulangi, Aimarie R.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Traboc, Marjorie M.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Vicente, Maria Cristina T.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Villanueva, Shaira S.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Vinta, Mary Ann C.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Vinzon, Abegail L.",
		department: "ACCOUNTING",
		office: "ACCOUNTING"
	},
	{
		fullName: "Abes, Julius M.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Angeles, Maria Jazzmin A.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Badoy, Maria Victoria A.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Balana, Mary Jane D.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Basilad, Rene O.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Dasig, Renan James P.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Dela Fuente, Arturo II G.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Eugenio, R-Jayson D.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Ferrera, Christine T.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Guevara, Jo Irene V.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Guinto, Enrico A.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Icban, Chalor Howell S.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Isma, Princess D.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Kamantigue, Ressie Mae S.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Laniohan, Dionisio Jr. J.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Layug, Albert G.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Loyola, Geoffrey C.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Luis, George M.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Maglaque, Maribel L.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Majadas, Hanna Shyrine P.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Manalansan, Alden P.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Manrique, Maryed Jaicas J.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Manuel, Biyaya B.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Mendoza, Maria Reanna G.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Mina, Sherwin S.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Miranda, Erika C.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Omega, Patricio II B.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Pagdanganan, Joseph Silvino C.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Pascual, Francisco IV G.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Patdu, Andrea Nicole J.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Patdu, Jerome L.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Pizarro, Alicia D.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Ragel, Mary Ann Q.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Refuerzo, Teresa P.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Reyes, Katherine L.",
		department: "ADMINISTRATOR",
		office: "ADMIN",
		onDuty: true
	},
	{
		fullName: "Rodrigo, Glezy M.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Rojas, Joram P.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Torres, Rejeana Kaye P.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Tranate, Reynante M.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Bagtas, Darren John Lorenz M.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Bartolome, Jaymie N.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Bongco, Lenard M.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Bunsoy, Ian Michael C.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Carreon, Angelica T.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Cruz, Peterson C.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Gaupo, Christian C.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Jorge, Chester Anthon S.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Layug, Joemel R.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Mendoza, Alex Alejandro C.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Sampang, Antonette R.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Samaniego, Imelda C.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Santos, Jhuddy Anne V.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Tolentino, Anne Nicole D.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Tolentino, James Christian M.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Valencia, Bobby L.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Villafania, Jeremiah S.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Vinavelez, Niño Allan R.",
		department: "ADMINISTRATOR",
		office: "Malasakit Center"
	},
	{
		fullName: "Belleza, Klyde Brixter C.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Cinco, Jenny Lyn  B.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Domaoal, Nheil Christian D.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "De Guzman, Paola Nezia D.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Escueta, Dolores  S.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Escueta, Ma.Blesselda S.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Escueta, Jaimie  P.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Gloria, Emmanuel Jr., A.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Golisan, Gladys D.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Golisan, Raymond D.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Jorge, Maricris J.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Laxa, Ruperto T.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Pantig, Irish Joy C.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Punla, Blas Elias S.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Sanchez, Kirstine R.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Valencia, Barry L.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Valiente, Margie N.",
		department: "ADMINISTRATOR",
		office: "SAP"
	},
	{
		fullName: "Mangalindan, Jovita R.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Mangaliman, Orlando B.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Santos, Efren P.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Soberon, Minerva P.",
		department: "ADMINISTRATOR",
		office: "ADMIN"
	},
	{
		fullName: "Austria, Ma. Aimee .",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Bagtas, Joyce Anne M.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "De Jesus, Rohana Danelle V.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Sanchez, Camille V.",
		department: "ADMINISTRATOR",
		office: "IAS"
	},
	{
		fullName: "Gloria, Kristine Joy A.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Sajota, Janine S.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Sioson, Irish M.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Yapendon, Maria Khatleen C.",
		department: "ADMINISTRATOR",
		office: "OSM"
	},
	{
		fullName: "Almario, Rolando Jr. S.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Arligue, Michael C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Atienza, Mark Angelo I.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Atienza, Ronaldo L.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Bermudo, Michael E.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Bugay, Benjamin M.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Camacho, Emelda P.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Caraig, Sonny Boy C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Catapang, Fe B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Cruz, Christopher Y.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Danetaras, Rosa Maria C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Dizon, Johanna R.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Enriquez, Mikko F.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Fombuena, John Deniel G.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Garcia , Krisha Mae R.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Gonzales, Darwin R.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Isidro, Reynaldo S.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Landicho, Joven B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Layug, Antonio A.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Liggayu, Elizer P.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Marabe, Normina B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Mendoza, Jeffrey C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Nuestro, John Lorenz T.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Ocampo, Abbeygail C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Ortile, Alan O.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Ramirez, Maribel B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Resubal, Diego Jr. D.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Resubal, Gladys T.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Rodis, Luisa V.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Rosanes, Alpha E.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Rubiano, Briccio C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Salas , Jomari G.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "San Diego, Richard M.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Santos, Leonie Marie G.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Sarili, Cyrus Limuel D.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Sidon, Michael M.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Silva, Ronald T.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Subiaga, John Peter J.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Tablan, Marionne Kimberly C.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Tayo, Julie Ann D.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Tuazon, Julio Jose B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Villanueva, Ferdinand Jr. B.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Villanueva, Ferdinand Y.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Garcia, Ramon D.",
		department: "AGRICULTURIST",
		office: "AGRICULTURIST"
	},
	{
		fullName: "Aala, Mon Carlo C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Adlawan, Mary Rose B.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Angeles, Allan V.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Baluyot, Marchie G.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Bautista, Mart Allister C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Capan, Ray Thelnoso J.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Caracas, Lorena M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Caracas, Wilson Jr. S.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Capan, Ray Thelnoso  J.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Cruzado, Christian A.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Dacuma, Dolores P.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "David, Johnfel E.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "De Jesus, Corazon P.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Del Mundo, Julie Ann C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Dispo, Johan N.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Estrella, Romina A.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Eugenio, Joanna Marie A.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Gacutan, Luisa Marie T.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Galamay, Racel A.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Guinto, Maria Cristina C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Hernandez, Angelo Marco P.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Herrera, Ricardo C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Luna, Jennifer R.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Manalo, Farrah M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Manalo, Jarrie L.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Manlapaz, Mary Joanne B.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Manrique, Angelica M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Monta, Menette C.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Morales, Desiree H.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Nisay, Friah Karizza G.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Palma, Edwina M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Penequito, Aireen B.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Pulido, Mabini Jr. R.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Sabado, Czarina Enna M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Salvador, John Bryan D.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Samson, Jheric V.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Tuazon, Johnica May M.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Valencia, Joni A.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Valentos, Sharon S.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Vengua, Reinier E.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Yocte, Aldrin James B.",
		department: "ASSESSOR",
		office: "ASSESSOR"
	},
	{
		fullName: "Arellano, Rowena C.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Austria, Rona Anne H.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Babala, Shiela N.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Baciles, Alain M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Baciles, Ma. Luisa G.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Baciles, Sancho L.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Banzon, Reynilo A.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Buliyat, Maria Zaida B.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Busa, Francis A.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Busa, Karen M.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Camacho, Ryan Christian C.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Castillo, Malou P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Castro, Ma. Bhangielynne C.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Julius B.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Daracay, Fae Anne B.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Dayrit, Moneera Joy M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "De Guzman, Junel P.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "De Mesa, Jexanel C.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Dela Cruz, Jaybee B.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Devaras, Oscar Jr. B.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Enriquez, Angeline L.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Frenilla, Kristine C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Gonzales, Reynaldo R.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Hernandez, Eleal Ever M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Hernandez, Oliver M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Ilagan, Kristel Christian D.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Ilustre, Sherry Ann D.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Jordan, Krizzel Ailo E.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Labog, Bernadette N.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Labog, Ernesto Jr. N.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Lucas, Angelica M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Lucas, Santiago D.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Magpayo, Ronald C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Manalo, Anna Patricia P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Manalo, Aris C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Manalo, Emily P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Manalo, Marvin F.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Manalo, Rowena R.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Maneja, Carizza May R.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Manzano, Anna Catriza T.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Mariano, Marylen B.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Marquez, Friedo N/A.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Marquez, Irene M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Napigkit, Lovella J.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Narciso, Krizel Ann V.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Nojadera , Reynante B.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Pacifico, Oliver V.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Paguio, Angeli P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Pega, Danica Mari M.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Quiroz, Glady S.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Recinte, Jocelyn T.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Reyes, Paul Alvin E.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Reyes, Roderick V.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Salvacion, Eula N.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Sandoval, Romeo Jr., M.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Santos, Mary Grace P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Tamondong, Gerald P.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Teopengco, Maritesse SD.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Teruel, Kathleen T.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Torres, Maximina Mercy C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Urbina, Maida C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Gubuan, Wynne L.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Gumman, Jefferson P. ",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Valdez, Krizzia S.",
		department: "BCMH",
		office: "BCMH",
		onDuty: true
	},
	{
		fullName: "Yap, Jonathan C.",
		department: "BCMH",
		office: "BCMH"
	},
	{
		fullName: "Calara, Maria Stephanie G.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "De Jesus, Williamson E.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Garcia , Cathlyn Joyce A.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Leonzon, Christopher C.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Niepe, Antonio Jr., R.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Orani, Shaina May M.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Pascua, Marielle S.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Reyes, Rona V.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Roman, Jeffrey B.",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Rosales, Amelia",
		department: "BHSO",
		office: "BHSO"
	},
	{
		fullName: "Aguas, Joana Marie C.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Agustin, Monina D.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Antonio, Maria Ursula Paula Mae B.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Banzon, Eduardo D.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Cambronero, Emmanuel Rey Q.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "David, Lorela H.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Demetion, Annie B.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Eugenio, John Emmanuel A.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Ganzon, Marjorie Anne T.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Garcia, Rosario M.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Gonez, Kathreen Mae D.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Javier, Roberto D.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Montales, Princess Joy B.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Tria, Sheila T.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Vinzon, Raymond D.",
		department: "BUDGET",
		office: "BUDGET"
	},
	{
		fullName: "Abara, Gena A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Abilgos, Paola Gianerikei V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Abuyo, Renzie R.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Acuña, Alberto Jr. M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Acuña, Kenneth Alvin S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Aguilar, Ofelia T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Aguiluz, Alfredo N.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Alamani, Jollybenson A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Albano, Marwen Faye Y.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Alcantara, Charmine Joy S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Alimurong, Kristine Joyce D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Almario, Hilario R.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Alonzo, Maya Grace D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Alunday, Alvin S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Angeles, Joann S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Angeles, Sarah D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ararro, Francis Noel D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Arellano, Mervin S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Arsua, Ismael S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Arzadon, Erika C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Aspacio, Rafie G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Avillon, Darcy Allen M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Azarcon, Ronadelle V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bacani, Cristian B.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Badere, April L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Balagtas, Norman L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Balingit, Magdalena B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Baltazar, Irene B.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Bamba, Aldrin Butz E.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Bañares, Mae M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Barrera, Edgardo D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bartolome, Editha T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bascara, Jennyfer Maureen B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bautista, Eden Joy F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bautista, Jaminah F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bautista, Maribel S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Baylon, Amparo Tricia D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Baylon, Olet J.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Bedie, Maria Riza D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Belderol, Janica Lois T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Benitez, Mark Wilson L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bernardino, Coleen Feliza V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bitangcol, Lauren R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bondoc, Venus F.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Borlongan, Luigi Angelo V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Buan, Joseph Romel A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bungay, Francis S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Butt, Mariam Jehan D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Cabato , Mark Virgel T.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cabato, Fernando Jr., B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Calleda, Angelie Rose V.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Camba, Fay Alline G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Campollo, Tahirrih M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Capirig, Agnes S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Carlos, Rosabelita D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Casupanan, Samantha Isabel R.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cerezo, Monica Therese R.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Chua, Catherine Anne T.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Closas, Donnie M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Constantino, Joycelyn M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Coralles, Jan Daniel L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Coronia, Arcie B.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Corpus, Juan Michael C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Corpus, Maricris E.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Angelo Martin B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Cruz, Helen P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Cruz, Jae Paul Lorenz A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Jeanefer S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Joeselle Nicole C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Jonalen Louralej A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Cruz, Mary Jane T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Cruz, Myra Belle D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Cruz, Roy Robert M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Dabu, Maria Rowena P.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Dagame, Dalen R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dahunan, Lorson G.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Danan, Ronald B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Danao, Marian P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Datu, Nathaniel R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "David, Janine Leslie R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "David, Renzy Anne B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "De Guzman, Bianca Isabelle S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "De Guzman, Bobby D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "De Leon , Edward L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "De Leon, Ariel D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "De Leon, Hasmin D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "De Vega, Sheryl F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "De Vera, Erika Jane T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dela Rosa, Jezrehl L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Detabali, Francis O.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Diego, Jan Paul S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dimaunahan, Deodar Q.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Dimla, Janella Mae R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dimson, Ma. Consolacion P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ducay, Rogelio P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ducut, Kim Mari R.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Dula, Kristine E.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dulce, Arabelle Gem S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Dungca, Ryan Joe A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Ecal, Jeremy Ann M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Eheng,Eduardson P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Elefan, Marlyn B.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Escueta, Angelica S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Esguerra, Tristan P.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Esmeria, Marie Eugenie S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Espino, Mikkee Rose P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Fabiana, Ola M. ",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Fernandez, Jaene R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ferrer, Kimberly Kaye O.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Figuracion, Wilmyn P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Flores, Anali L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Flores, Ara Joyce I.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Flores, Doreen D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Flores, Jennifer R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Francisco, Ava C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Francisco, Melvin Joseph C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Frondozo, Arcedes M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Frondozo, Arnel M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Galang, Ivy Hazelle C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Galo, Edwin D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Garcia, Girlie S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Garcia, Miriam T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Gaza, Jose Jr. C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Gesmundo, Sandy Love L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Gigante, Jaypee L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Guevarra, Dannel John D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Guevarra, Frederick S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Guinto, Joanna Marie M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Guinto, Shailyn L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Gutierrez, Jennelyn L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Gutierrez, Jobeth L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Gutierrez, Milorie S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Guzman, Margarita R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Hernandez, Katherine Q.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Hipol, Jennifer F.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Hocson, Joanna May S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Humiding, Mark Jon Agustin P.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Iggo, Rosemarie T.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Ignacio, Florena A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ignacio, Lemuel A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Intal, Alex Q.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Julio, Joylyn Grace A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Kabiling, Jhay Lord R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Labios, Ella C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Lacson, Joseph E.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Larin, Suzette P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Layug, Melinda L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Lazaro, Jay Parson S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Lazo, Kim Vernes E.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Lintag, Katrina Mae F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Lopez, Adreson M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mabini, Aiko G.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Magdaug, Rementina Y.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Magno, Leonila Mae R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Magno, Mary Anne R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Malit, Andrea Verna S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mallari, Mikhail T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Manabat, Jose C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mañalac, Yen Aiko O.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Manalansan, Joshua D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Manalili, Ivy Rose V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Manayan, Wilson John T.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Mangulabnan, Rody T.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Manrique, Juleanna Astrid A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Maquesias, Gerald D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mardo, Neyziel D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mariano, Rosemarie V.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Mascareñas, Jerome L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mauricio, Rogelio A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Medina, Madie Grace D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Mendoza, Joan Medi S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Mendoza, Josalyn D. ",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Morales, Irene L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Narciso, Alyssa P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Navarro, Alen Iseline O.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Navarro, Michael C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Nicdao, Johnrey M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Niespla, Ysobel Aleya M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Nuguid, Jenny Joy D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Pacheco, Caselyn V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Padilla, Nannette R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Padua, Fanny G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Padua, Ronel G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Paguio, Ryan L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Pamintuan, Marie Julie V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Pangilinan , Mylles  S .",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Pangilinan, Alexandra .",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Pasamba, Edmundo M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Patiag, Jewel Jerome M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Paulino, Jay-Arr V.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Payuyo, Levi P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peligro, Arnold M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peña, Fe A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peña, Israel S .",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Peña, Jezzel Mae A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peñaflor, Estrella Marie Y.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peñaflor, Jash Shainnen K.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Peñaflor, Trisha Krhzl D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Perma, Princess S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Pineda, Angelita D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ponce, Farah I.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ponteres, Lejan L.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Puzon, Mary Jane B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Quimson, Cedriel S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Quintin, Katherine S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Quinto, Mark Joseph Ernest N.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Quinto, Perlinda M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Rabara, Marlon A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Rafols, Angelo M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ramos, Clarence A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ramos, Jovylyn V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Rapsing, Joel D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Regala, Josie L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Reyes, Alejandro F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Reyes, Dana Faye M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Reyes, Tracy John Henry M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Romero, Michelle R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Ronquillo, Franz Josef V.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Roque, Jhonet Sheriam D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Roxas, Gracella Celia A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Rubiano, John Robert Y.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Rufino, Michael Justin B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Salenga, Sabrina Laveene D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Salvador, John Richard M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Salvador, Lesly Anne G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Salvador, Marfe G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Salvador, Raquel P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Samaniego, Ronnie S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sambat, Lobella Joyce S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "San Diego, Kirby D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "San Miguel, Ruzzelei Jen C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sangalang, Ace R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Santiago, April Ruth H.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Santos, Arra M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Santos, James C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Santos, Mariano Jr., M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Santos, Raymarry J.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Santos, Raymon L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sarion, April Mae S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Sarmiento, Katrina V.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Sarmiento, Mishela B.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Sebastian, Judy Anne M.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sedurifa, Maria Carmen C.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Serrano, Czerina Khael O.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sevilla, Emil John C.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Simbulan, April G.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Simon, Manolo A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sitjar, Franz",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Soliman, Krizel Megan F.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Soliman, Rosario F.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Solomon, Janet D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sonico, Paula Aryanna Beatrice A.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Soriano, Hersley Ann S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Soriano, Leonardo Jr., E.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Soriano, Melinda G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Sotto, Erianne D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Sunga, Emily Q.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Sunglao, April S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Tala, Erwin N.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Tantiangco, Gina D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Tibor, Kyla S.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Timpug, Jennilyn D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tolentino, Amafel D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tolentino, Cynthia M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Tolentino, Yuna Rica D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Torreliza, Mark Lesther D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Torres, Michael P.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tuazon, Carlito Jr., R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tuazon, Kevin A.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tumang, Joel Carlo .",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Tungol, Jaime Jr., S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Umali, Cherry G.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Umayam, Jesica Mae S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Valencia, Angeline L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Valencia, James Ednel R.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Valenzuela, Leanna  L.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Varela, Jessa D.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Vesco, Shyne Nia D.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Viacrusis, Aline M.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Villegas, Reinwell I.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Yabut, Mark Joseph G.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Yamat, Joseph Y.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Yandoc, Teresita P.",
		department: "JCPMH",
		office: "JCPMH",
		onDuty: true
	},
	{
		fullName: "Yap, Carolyn B.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Zuñiga, Crisanto S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Zuñiga, Jose Jr. S.",
		department: "JCPMH",
		office: "JCPMH"
	},
	{
		fullName: "Bohol, Danica Grace",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Bueno, Eunice G.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Castro, Rowena R.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Dela Cruz, Jazzel R.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Menardo, Donna Belle G.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Mendoza, Fernando II S.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Santos, Ladybelle S.",
		department: "PGSO",
		office: "LEGAL"
	},
	{
		fullName: "Saplaco, Rogelio Jr. B.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Soriano, Jaslyn P.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Tordera, Reuben S.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Arceo, Alvin H.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Basanes-Mendoza, Karla Kristine L.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Cruz, Franz Ivan A. ",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Ines, Benedict Vincent L.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Molo, Jade Paulo T. ",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Relucio, Ramir S.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Soriquez, Mark John M.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Viray, Roberta Ann P.",
		department: "LEGAL",
		office: "LEGAL"
	},
	{
		fullName: "Abrera, Renno Niño D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Agrimano, Marfe L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Alba, Charlie V.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Arjona, Arjoe E.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Austria, Jenica M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Babaso, Lauro B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Bagtas, Joseph D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Balbuena, Don Reech Patrick C.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Bantay, Richard D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Banzon, Edwin M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Bartal, Ian Y.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Batusin, Alwen D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Baun, Kieffer Aaron S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Belleza, John Patrick P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Benedicto, Aldwin S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Bernaldo, Sonny C.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Bozar, Rizaldy T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Bringula, Ronaldo P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Bustamante, John Patrick F.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Calida, Ronnel S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Camiling, Gerald R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Carandang, Erwin D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Carel, Wally S .",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Carillo, Rhea Ann D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Carlos, Kelvin John L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Castillo, Eduardo II C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cayanan, Jay-R Moises N.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cereza, Mark D .",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Coronel, Andro Kayan T.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Cortez, Alexa R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cristobal, Vicente III G.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Cruz, Dyan Cheska R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cruz, Marc Dennice D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cruz, Marc John I.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Cruz, William Jr., P.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Cuartero, Abelardo Jr., D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Cunanan, Niccolo U.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Curameng, Henry Dexter L.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Dacion, Lamberto Jr. O.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Daras, Daniel Robert L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Datu, Ohlson S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "De Dios, Conrado Jr. M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "De Guzman, Luigi Alfonso J.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "De Guzman, Mark Joseph G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "De Guzman, Rafger D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "De Guzman, Tristan M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "De Leon, Jomer G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Dela Cruz, Hilda A.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Dela Cruz, Marlon B.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Dela Fuente, Vincent G.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Dela Rosa, Jeffrey V.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Desales, Daniel Zon T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Dimaculangan, Vanjo G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Diwa, Christopher E.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Diwa, Joel A.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Diwa, Mark Lexter T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Dizon, Richard Bong H.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Dollente, John Derick N.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Dolon, Chuck Kevin G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Dumlao, Jim Bryan P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Eugenio, Enrique H.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Fabrez, Gilbert N.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Fernandez, Serafin III R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Fernandez, Warly G.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Ferrer, Laurence V.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Flores, Allan Cristopher P.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Francisco, Allan Dave G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Fuster, Rainier Jr., R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ganzon, Lexter B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ganzon, Reggine T.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Garcia, Ernie C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Garcia, Mark Lester C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Gemzon, Meinardo R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Guanzon, Restie Eleazar D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Guinto, John Paul C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Gumafelix, Rodenson C .",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Gutierrez, Ric S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Guzman, Jan Rainier A.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Guzman, Jerwin C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ignacio, Jennalyn S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Infante, Alwyn C .",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Inocencio, Arnel M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Jimenez, Arjay G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Kamantigue, Angelo M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Karam, Radzmir S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Labrador, Ronnel M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Layug, Mark Jay B.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Lelis, Justine Carl M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Lorenzo, Aris T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Loreto, Rizien Carlie A.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Lungcay, Ervin H.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Macatuno, Kit Xendrix P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Maglaque, Amelito V.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Magpoc, Mary Grace D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Manalili, Resty Carl M .",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Mangalindan, Ruzzel Joseph H.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Manlapid, Mhel T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Marañon, Niño Anthony Joseph I.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Martinez, Joseph L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Matacot, Cezalyn S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Mateo, Charles R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Matias, Might D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Mena, Oliver M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Mendoza, Allan Jason G.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Mendoza, Juno Rogelio B.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Mina, Renson C.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Morada, Exzur Jr., M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Morales, Ben Azel L.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Morales, Marlon M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Moyco, Jeffrey D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Navarro, Charity C.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Navarro, Richmond B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Olalia, Eric P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ollorga, Rojen Joseph A.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Ona, Anna Mae T.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Ordinante, Ian Dominic T.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Oyon-Oyon, Jessie II P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Pablo, Ronquillo M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Pagdanganan, Michael Vincent C.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Pajarillaga, Riel N.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Pajarin, John Melvin R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Paraiso, Jerome D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Paredes, Ellaine N.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Peñaflor, Liemuel S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Pizarro, Carl Martin D.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Pizarro, Christopher F.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Pisquiza, Brian A.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Quezon, Nestor III A.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Quiroz, Alfred John B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Quiroz, Sherwin R.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Quitalig, Gabby P.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Ragadio, Adam R.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Raguero, Nico R.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Ramos, Ian M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ramos, Jaime Jr. B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Robles, Margaret Jean M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Rodrigo, Joe Mark L.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Rodriguez, Nichol John V.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Rodriguez, Rommel Joseph D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Roman, Ricelle L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Rombana, Noel D.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Roncal, Jeffrey Y.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Ronquillo, Rommel V.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Roxas, Theresa M.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Rueda, Michael Anthony L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Salazar, Ma.Catherine V.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Salcedo, Arsenia B.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Salta, Emerson R.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Samson, Aaron Lindon Paulo N.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Sanchez, Mark Anthony E.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Santiago, Mae Ann Rosal R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Santos, Albert J.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Santos, Aries R.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Saranillo, Jelson P.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Simeon, Charlemagne P.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Soyangco, Shane S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Talantor, Ejaye S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Tolentino, Marie Ann M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Torcuato, Rodolfo Jr., P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Torres, Mar Abbey B.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Torribio, Rodolfo N.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Trinidad, Ricky I.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Tuazon, Al Jefferson S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Tungol, Sean L.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Valencia, Carlo P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Valerio, Mario B.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Velasco, Alexander S.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Velasco, Envoy S.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Vicente, Harold P.",
		department: "MBDA",
		office: "MBDA",
		onDuty: true
	},
	{
		fullName: "Vinzon, Mary Rose M.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Visitacion, Cris Lorenz I.",
		department: "MBDA",
		office: "MBDA"
	},
	{
		fullName: "Abesamis, Michelle I.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Abing, Rhezee Grace N.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Agcaoili, Aldrick S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Aguilar, Ace Pocholo D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Albayalde, Hesiekhea S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Alcoreza, Adelbert E.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Allado, Terso H.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Alonzo, Maricar P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Angeles, Michelle F.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Antalasco, Joped S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Arriola, Ellaine R.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Basco, Joselito M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Bataller, Jose Elirdito B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Baun, Richelle S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Beraquit, Irish Caryll D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Berja, Christel Ann C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Bermejo, Mae A.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Bonifacio, Vangie N.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Bueno, Robilyn M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Calaguas, Camielle Anne B.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Calaguas, Carylle Julienne B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Calayo, Ivan Rex P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Camingal, Ellyvette Gwayne P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Canson, Maria Hazel A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Capili, Yna Lei B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Capule, Estella Marie Dayan V.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Caso, Bernadette Joy S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Castillo, Ronalyn Joy C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Ceradoy, Joan Marie M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Chuck, Arnold M.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Cometa, Gary Elvis E.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Corcuera, Louisito S.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Creencia, Nerissa O.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Cruz, Rosedelle M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dabu, Rhyam Niyl S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dangcalan, Billy Jade L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dela Cruz, Jennilyn A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dela Cruz, Rosenda S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Delos Santos, Joy T.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Diana, Joebelyn L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Diaz, May B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dimaculangan, Charls Bryan A.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Dimaculangan, Jose Raniel L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dimaculangan, Lloribel V.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dizon, Dominick Paul B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dula, John Paul Omar Z.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dumo, Lea T.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Eder, Carlos Victor N.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Esteves, Via Marie C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Estigoy, Emelita R.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Fernandez, Cherry A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Fernandez, Jim E.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Florendo, Irish F.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gabriel, Aubrey C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gallardo, Cyrill John R.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gampoy, Myla P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gara, Kristine M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Garcia, Normelito M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Garcia, Rolando R.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gatdula, Deejay Lhyn M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gomez, Cherry A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Gososo, Lourie Jean V.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Grate, Hazel P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Handugan, Ariane Nicole D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Javier, Charmaine L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Kabigting, Ela Rica M.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Lagahit, Rommel T.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Laylo, Danica B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Lazarte, Ma. Theresa P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Lumanglas, Pauline Kasten P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Luneta, Kristel Joy P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mabini, Armida C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Magpoc, John Christopher M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mañalac, Christell Ann M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Marasigan, Rionica M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Marquez, Joseph A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Matacot, Arbie E.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Maza, Rainier R.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Medina, Ernesto Jr. P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mendoza, Louie Angelo C.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Mendoza, Maui I.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mojica, Rowel M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Monilla, Marigae Krista G.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Morada, Michael L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Moraleja, Ditas D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mores, Chester Anne V.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Morpe, Wendell P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Naco, Alyssa Kim Dannielle G.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Napicol, Eric D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Navarro, Joyce M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Nopia, Sandra A.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Obdin, Tracy Nicole M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Obiando, Albert Rey C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Obra, Dianne Margarette P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Ocampo , Duds Joseph  M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Oliva, Queen Cell M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Olivares, Marjorie M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Ongoco, Leonardo Jr., A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Pangan, Katherine A.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Pascua, Glenmark F.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Peralta, Joshelle M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Perez, Ierell U.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Perez, Michelle D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Pordonzalan, Michelle L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Pural, John Carlo A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Ramos, Erika Joy A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Rodriguez, Ric D.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Sabino, Andy S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Saliente, Alwin Jr. C.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Saliente, Lordiza L.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sallao, Jann Nathaniel C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sallao, Joerdon M.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Santos, Hector T.",
		department: "ODH",
		office: "MDH"
	},
	{
		fullName: "Sawit, Marielle Aiza Joy D.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Sayo, John Robert A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sena, Cheysser Arvie M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sinchongco, Edgardo I.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Singh, Trisha Lei O.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sonon, Rochellee D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Sumadsad, Angel B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Tabernero, Zusilyn A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Talabong, Janelle Rose E.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Tapalgo, Cherry Ann C.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Tawatao, Mary Ann R.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Tolentino, Rency M.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Tungol, Erl John Q.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Valdez, Mary Ann B.",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Veloria, Norberto E.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Venturina, Kaira Vianca A.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Viray, Christianela B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Yabut, Lemuel S.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Yumul, Biolet Valentina Y.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Decenteceo, Ana Cristina D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Dimalawang, Zohaila M.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Jalaidi, Sheryl F.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Lopez, Lee Anne G.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Mandi, Putri Saphia D. ",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Oandasan, Darwin U. ",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Oandasan, Maria Pamela P.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Quiroz, Jomell .",
		department: "MDH",
		office: "MDH",
		onDuty: true
	},
	{
		fullName: "Taguiling, Claire D.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Versoza, Charlene B.",
		department: "MDH",
		office: "MDH"
	},
	{
		fullName: "Abad, Maricris C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Acuña, Brendalyn Q.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Acuña, Denise Aileen S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Acuña, Faith O.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Adraneda, Audrina P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Adraneda, Clarisse Joy S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Adraneda, Ethel S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Aguilar, Melissa E.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Alba, Mary Rose T.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Albaña, Oswald D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Albelda, Patrick F.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Alcantara, Micko R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Alejo, Leonardo Jr. D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Almero, Juliana D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Angeles, Melanie Joyce M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Angeles, Richmon C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Atibagos, Angelie B.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Aquino, Richard R.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Arellano, Michelle A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Avendaño, Razzel C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bacani, Michelle Anne R.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Badinas, Ghelou R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Balingit, Alma B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Baltazar, Juanito Jr., P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bangco, Hommer S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Barrion, Cecilia A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bautista, Claudine Ann D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bautista, Herlene C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bautista, Shaira Jazmine P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Benitez, Ilene Irish C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Bringas, Diana Marie S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Bringula, Maita-Mia D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Buan, Jerose H.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Cabalic, Necetta I.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Cabidog, Cesar C.",
		department: "PHO",
		office: "ODH"
	},
	{
		fullName: "Cabral, Ernesto Jr. B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Canlapan, Leandro D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Canlas, Mary Rose R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Capili, Emily B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Capili, Eryl Mae Y.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Codilla, Jinky L.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Cruz, Cecille S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Cruz, Mark Joshua L.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Cruz, Rizell Jane L.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Cruz, Romeo C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Cuartero, Chris Ann D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dacion, Ednalyn N.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Datu, Maridel C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "David, Imelda DS.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "De Guzman, Jacquelyn P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "De Jesus, Jacqueline Z.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "De Jesus, Michael Andrew D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "De Leon, Crysthia S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "De Luna, Pedro S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "De Mesa, Marlene V.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Deang, Adam Andgeline S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Del Rosario, Angela Rosa P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dela Cirna, Crisanta B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dela Cruz, Anna Leveriza P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Dela Cruz, Erbert P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dela Cruz, Myrene P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dela Rosa, Andrea G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dela Torre, Mariel Kim M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Deldoc, Adrian D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Delos Reyes, Sarrah D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Domiguez, Katherine C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dominguez, Maylene O.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Ducut, Mary Ann R.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Dumandan, Niño S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Dumayas, Michael R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Dumlao, Sharmaine B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Estoya, Mark Anthony O.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Evangelista, Maria Laurice P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Eya, Rizie Lyn P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Fabian, Maryll M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Fabian, Narcisa M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Fajardo, Dominique Ellein V.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Flores, James Matthew M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Franco, Joni G.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Fuentes, Jocelyn B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Galang, Ma. Leslie C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Gamboa, Conny Ann A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Garcia, Elizabeth A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Garcia, Romelo R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Garrido, Ma. Nica Mervi-Ann S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Gomez, Gerardo C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Guinto, Wilhelmina E.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Guinto, Yell S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Hale, Noriel R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Hatol, Jeanipher S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Hernandez, Angi Elou C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Hernandez, Pophs S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Ibe, Philip A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Ilagan, Krizzia Anne V.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Inocencio, Maebelle D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Isip, Abrillo M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Jimenez, Apple Joy M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Julio, Myrna Grace A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Lat, Leigh Ann M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Legaspi, Anne Nicole B.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Llenarez, Cresencio R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Macalinao, Enrico A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Magtanong, Janelle Ann C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Malungcut, Jude Chester G.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Mangaliman, Karizza Joie O.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Manubay, Rosalie P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Manuel, Em-Em G.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Mascariña, Desiree G.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Matawaran, Diane P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Medina, Jeffrey P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Medina, John Patrick A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Mera, Laarni B.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Morales, Janette M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Morales, Jeffrey L.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Nallares, Ariel C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Navarro, Dennis A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Nemis, Elanie Jane A.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Niespla, Leila M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Nisay, Nadine J.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Ocampo, Elleonor P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Omagap, Jayson M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Omagap, Jeffrey M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Padua, Romeo Jr. N.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Pagaduan, Aizelle Justine F.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Paguio, Diana Elaine O.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Palaypay, Maureen T.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Pascua, Denuel R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Pascual, Alyanna Marie T.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Pascual, Jhemar Hope D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Paule, Arnel C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Peña, Arcie L.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Peregrino, Mary Ann R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Poblete, Racquel V.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Ponce, Aurea T.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Puzon, Christopher S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Quindoy, Anna Liza O.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Quintana, Daniel Roy R.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Ramos, Anacel R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Reñosa, Rose Allen A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Reyes, Estephanie Lyn M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Reyes, June G.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Reyes, Maria Lea S.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Rojas, Sheila G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Roman, Jarelle G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Roman, Wilfredo R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Roque, Dasched Vincent M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Roque, Gienell P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Rubiano, Jamie Lee R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Sacdalan, Mark Angelo D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Salaver, Zoraida S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Samson, Marivic G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Sanchez, Jennifer Q.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Santiago, Rosauro G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Santos, Jeric C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Santos, Marcos D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Santos, Paulo D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Santos, Victoria B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Schöfisch, Hans Martin C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Silvestre, Andy D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Sunga, Lexer Irvin D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Sunga, Rosita D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Sureta, Maria Cristina V.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Tagorio, Rodelio P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Tamayo, Grace C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Tolentino, Jocyana I.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Torres, Erica D.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Torres, Maribeth C.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Tuazon, Angie R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Valiente, Imelda D.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Villafania, Grace Cel Q.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Villaflor, Glenda I.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Villegas, Rowena I.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Vinluan, Patrick Michael B.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Zabala, Jennie V.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Zulueta, Rona Mikaela M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Anacta, Salustiano III A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Andrada, Allen M.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Calamaan, Frederick Christian T.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Calimbas, Janine R.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Caudilla, Jennifer L.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Cheng, Jennifer M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Domagas, Leslie Mae F.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Dotimas, Kaethe Venice C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Fabian-De Vera, Anne Ville B.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Jara-Villalon, Jamelynne V.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Nico, Darlene Jasmine G.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Pascua, Ayvee Lyn I.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Salvani, Ma. Farrah Mae P.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Samaniego, Ellen Grace Joy P.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Santisteban, Jhoana Rose M.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Soliven, Brian Christian A.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Soriano, Ellison E.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Urbano, Amelia S.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Uy, Mary Kamylle-Ashley R.",
		department: "ODH",
		office: "ODH",
		onDuty: true
	},
	{
		fullName: "Yusi, Dennie Joanne C.",
		department: "ODH",
		office: "ODH"
	},
	{
		fullName: "Atuan, Mary Grace G.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Banzon, Ludivina G.",
		department: "PGSO",
		office: "PCEDO"
	},
	{
		fullName: "Bartolay, Diana Rose M.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Bernabe, Mary Ann D.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Cambronero, Maria Geneva B.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Delos Reyes, Rowena F.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Famor, Erica Mae Q.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Hipolito, Roanne Sharmaine E.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Jose, Aliw Z.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Macomis, Raymund C.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Paguio, Bienvenido Jr. R.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Pizarro, Asser John H.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Reclosado, Katrina M.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Tolentino, Dexter R.",
		department: "PGO",
		office: "PCEDO"
	},
	{
		fullName: "Tuvera, Alberto C.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Bernardo, Ana Patricia V.",
		department: "PCEDO",
		office: "PCEDO"
	},
	{
		fullName: "Agnes, Richmond T.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Agustin, Nash Dylan G.",
		department: "PDRRMO",
		office: "PDRRMO",
		onDuty: true
	},
	{
		fullName: "Arellano, Glench O.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Bautista, Cherry Anne M.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Casem, Princess Eleonor P.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Cortez, Alexis L.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Cruz, Thea Joana V.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "De Guzman, Aira Mae A.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Diwa, Glenn C.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Ebidag, Mark Lorenz S.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Flores, Richelle D.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Landicho, Maureen S.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Laus, Ralph Darrell C.",
		department: "PDRRMO",
		office: "PDRRMO",
		onDuty: true
	},
	{
		fullName: "Libot, Paul Bryan M.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Martin, John Romar J.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Mateo, Danielle S.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Morales, Adonis M.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Nisay, Rodney R.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Ramos, Mark Rafael B.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Tupas, Maria Janila B.",
		department: "PDRRMO",
		office: "PDRRMO"
	},
	{
		fullName: "Abac, Jovenello Voltaire P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Alba, Harrison C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Alsadon, Orlando Jr. G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Amado, Priscilla Cassandra S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Anib, Jerick D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Antalasco, Juanito D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Aranas, Virgilio Jr. E.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Austria, Joseph L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Balor, Wilfredo D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Bartolome, Christian D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Bernabe, Mharvhie V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Bernabe, Warren A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Bohol, Antonio N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Bozar, Rico T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Censon, Ronaldo D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Chiuco, Rhoneel D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Consunji, Concepcion P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Cornejo, Michael A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Crisenes, Armando Jr. F.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Guzman, Joselito S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Jesus, Gina Q.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Leon, Joselito C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dela Cruz, David D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dela Cruz, John Noel D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dela Fuente, Carlos C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dinglasan, Adrian C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dizon, Harry C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dizon, Reynaldo T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Duran, Roseller E.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Emperador, Jerimie N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Enriquez, Nelson S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Escartin, Edgardo B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Escudero, Jaime G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Fernandez, Jervin Mark D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Garcia, Archie M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ilaya, Benjamin Jr. B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Isla, Mary Grace D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Lim, Manuel Jr. S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Mangalindan, Mary Grace R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Marquez, Jeenina Claire P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Mendiola, Sarah A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Molina, John Paul C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Molo, Jestoni T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Nisay, Ninia Angela R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ongoco, Gerardo B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Pablo, Margelyn J.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Palacio, Pamela T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Palaypay, Aries P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Palaypay, Raymond G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Pampuan, Rudolfa M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Pascual, Margarita R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Pizarro, Bea Mae G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Rabina, Rhoel V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ramos, Aldrin S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Reyes, Kevin Harvey R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Rivera, Nory Mae C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Rodriguez, Noel E.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Roncal, John Denver R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ronquillo, Isabel Claire G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ronsairo, Jan Fredrik L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Rueda, Rafael L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sadia, Rizalino S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sanchez, Conrad J.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Santos, Arleen R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Santos, Danilo B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sazon, Victor S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Siccion, Cheryl Lou S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sietereales, Ronrick V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sioco, Joselito D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Solomon, Merlito C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sombilla, Jayson Z.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sugatain, John S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sunga, Jonathan B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Talastas, Artemio Jr. A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tolentino, Renato Jr. M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tomas, Warren P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tordera, Ma. Cecilia T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tuazon, Danilo Jr. C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tuazon, Karen V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Valenzuela, Josephine R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Viray, Manuel M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Vivas, Justine D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Vivas, Phaula Bianca P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Yuzon, Enrico T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Arellano, Amery Ann D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Carreon, Reina Lou M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dacayo, Iris Joyce A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Lingad, Mitzi Joyce P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Perez, Marcos Jesus P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Prado, Jenna Aimee S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Santos, Eric M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Estrada, Asyllen A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Arangel, Abigael A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Casimiro, Rowland V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Paninsoro, Rica Mae B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Salazar, Hazel Joyce A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Awa, Paquito M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Baciles, Jemo G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Caag, Bernie Jude T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Cartujano, Jay-Ar D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dacuma, Kit Andrew C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dacuma, Renz John C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Jesus, Carlo R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Jesus, Jaspher Jade A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Jesus, John Lester L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Jesus, Joseph Sr R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Diwa, Jojie Dan A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ecol, Joshua D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Espina, Gerry Boy V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Espino, Mark Anthony T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Libay, Diovanni N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Molina, Jeric D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Molina, Laurence P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Nacpil, Ejay N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Niepes, Justin T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Niepes, Ronnel D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Oria, Rio Dantes M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Punla, Michael A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Raqueño, Kelvin D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "San Jose, Jayson L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Somo, Merlito A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Talavera, Axl Jon T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Villanueva, Cavin Jay A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Baluyot, Arvin Paul D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Calina, Philip Jay E.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Cruz, Rodello V.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Diaz, William T.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dizon, Jayson Y.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Flores, Pepito O.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Mariano, Michael Mark C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Martinez, Alexander C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Molina, Joseph Ian Q.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Palaypay, Alberto B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Reyes, Henry L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sangalang, Dante I.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sevilla, Jaime M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Tabadero, John Michael J.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Canare, Jericho P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Enriquez, Arra Clarisse DC.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Platero, Ferdinand M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Abad, Hans Titus D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Aquino, Llynette L.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Balingit, Reyhn D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Cruz, Joseph Louise I.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dayao, Kirstene Joyce M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "De Guzman, Fritchie D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Delos Trinos, Yosef Jian B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Lopez, Nichole Alliah Mae C.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Madia, Diether Elison N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ongoco, Jefferson S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Santiago, Mark Daryl F.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Vinzon, Aliza P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Lacsamana, Josiah Paul .",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Lingal, Gregorio Jr., M.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Luanzon, Patrick Joseph B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Palo, Christoper P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Reyes, Jules Harold G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "David, Mary Jeane N.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Del Mundo, Paula Nicole P.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dela Fuente, Paulo II H.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Dumandan, Nicole S.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Forbes, Deniele Joseph D.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Manio, Janine R.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ramos, Jericko G.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ongoco, Reynaldo P. ",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ramos, Ronnie Z.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Ramos, Win Chester B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Sacdalan, John Lorenz I.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Inales, Emman Ellis A.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Seril, Andres Larry B.",
		department: "PEO",
		office: "PEO"
	},
	{
		fullName: "Anillo, Kevin M.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Bacala, John-John B.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Balbuena, Francis S.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Basalo, Maria Eva M.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Cadungog, Sweetsel G.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Concepcion, Liza E.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Dadural, Patricia Mae S.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "De Leon, Kenosis M.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Del Mundo, Erwel M.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Masamoc, Ariel A.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Recio, Jinky L.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Soriano, Rovinnel M.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Trajano, Mary Jane V.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Villaruz, Ruth D.",
		department: "PESO",
		office: "PESO"
	},
	{
		fullName: "Aguirre, Rossen D.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Agustin, Adoracion C.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Alipio, Mark Vincent L.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Antonio, Celine S.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Balbuena, Karen June A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Barrantes, Jhanero P.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Braza, Pristine D.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Cabuslay, Adrian T.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Corpuz, Allan M.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Corpuz, Remy Rose E.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Cortez, Michael F.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Cuaresma, Rodora M.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "De Leon, Raphael C.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Dela Cruz, Harrison B.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Dela Rosa, Edwin O.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Evangelista, Jason L.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Gurat, Dodie A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Isidro, Mistylyn C.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Limos, Aviva G.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Manalili, Jaira D.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Mendoza, Billy A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Mendoza, Christian A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Nuguid, Ramon A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Panganiban, Rhemar S.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Patdu, Benigno B.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "San Diego, Kristian A.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Santos, Bernard P.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Susi, Ernesto S.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Tranate, Roberto L.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Tria, Genebel Celine B.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Trillana, Angelo M.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Ultimo, Fernando G.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Valdecañas, Sherilyn F.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Vidallon, Jessie Rey R.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Vinzon, Ron Arnold R.",
		department: "PG-ENRO",
		office: "PG-ENRO"
	},
	{
		fullName: "Arangel, Wilfredo Jr. C.",
		department: "PGO",
		office: "PGO",
		onDuty: true
	},
	{
		fullName: "Arriola, Nestlyn T.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Atuan, Gilbert M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Baldo, Gina A.",
		department: "PGO",
		office: "Kabalikat"
	},
	{
		fullName: "Bautista, Danilo D.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Bernabe, Rosita R.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Bulado, Stephanie C.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Calara, Edgardo Jr. F.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Calma, Jeffrey T.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Cañas, Ramon Jr. R.",
		department: "PGO",
		office: "Iskolar"
	},
	{
		fullName: "Caraig, Michelle N.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Castro, Jomar P.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Clemente, Rogina T.",
		department: "PGO",
		office: "Kabalikat"
	},
	{
		fullName: "Crisolo, Aileen N.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Cundangan, Kristina P.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "David, Jimbo R.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "De Silva, Ruena D.",
		department: "PGO",
		office: "Iskolar"
	},
	{
		fullName: "Dela Cruz, Joan F.",
		department: "PGO",
		office: "Kabalikat"
	},
	{
		fullName: "Dizon, Ma. Virginia I.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Escober, Noel E.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Escudero, Hellen M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Fernandez, Mary Grace G.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Garcia, Jose Enrique III S.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Garcia, Julius M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Garcia, Sheila Marie R.",
		department: "PGO",
		office: "Iskolar"
	},
	{
		fullName: "Guinto, Niño O.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Juco, Precy D.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Munar, Riza M.",
		department: "PGO",
		office: "Iskolar"
	},
	{
		fullName: "Navarro, Restie P.",
		department: "PGO",
		office: "PGO",
		onDuty: true
	},
	{
		fullName: "Navoa, Rodolfo Jr. D.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Nohay, Noemi M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Oximoso, Erwin M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Perez, Paulo H.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Ramos, Lorietta L.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Ronquillo, Peter Carlos V.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Roque, John Edison B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Sagun, Aileen C.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Sambas, Rolando B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Sanchez, Sophia G.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Santiago, Joshua A.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Soriano, Lorna E.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Valerio, Kathleen Rose B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Biliwang, Ricardo M.",
		department: "PGO",
		office: "PGO",
		onDuty: true
	},
	{
		fullName: "Clemente, Antonio S.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Dionisio, Jexter F.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Pantaleon, Von P.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Ramos, Jinkee F.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Reyes, Raymart I.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "San Juan, Rolando S.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Velasco , Carlos Jr., A.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Balangitan, Riza Mae T.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Balor, Lexlynn Grace P.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Enriquez, Jeric A.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Garcia, Angelica B.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Magpantay, Glecyl Ann C.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Ocampo, Ryan C.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Romanban, Jaime N.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Sombilla, Maila Graciela S.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Zaballa, Jovenal F.",
		department: "PGO",
		office: "BAC"
	},
	{
		fullName: "Arjona, Dawn  M.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Capili, Joshua Maree T.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Cruz, Christian Joel I.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Desamito, Czarina Mae P.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Dispo, Regina Mae S.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Enriquez, Arjay V.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Espiritu, Genesis S.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Guzman, Eric C.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Hipolito, Adson T.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Izon, Ruby A.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Macalinao, Glenn G.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Magsino, Jojo M.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Maninang, Liberty M.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Pagdanganan, Ma.Diana Faye C.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Sapuyot, Mark Joseph F.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Solomon, Michael John D.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Solomon, Janine C.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Vergara, John Kervie B.",
		department: "PGO",
		office: "ISKOLAR"
	},
	{
		fullName: "Acuña, Rosario S. ",
		department: "PGO",
		office: "Kabalikat"
	},
	{
		fullName: "Borja, Percian Joseph C.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Dajay, Je-ann A.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "De Guzman, Eliseo P.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Emata, Simeona B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Enriquez, Fatima Elisa S.",
		department: "PGO",
		office: "CONG. ABET"
	},
	{
		fullName: "Ferrer, Gaudencio C.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Galicia, Godofredo B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Hernandez, Gerard Patrick A.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Izon, Rodolfo S.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Leachon, Anthony C.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Odunlami, Samuel O. ",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Pizarro, Leonard Michael S.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Reyes - Beber, Mary Ann Agnes Jertez Y.",
		department: "PGO",
		office: "PGO",
		onDuty: true
	},
	{
		fullName: "Rojas, Rolando S.",
		department: "PGO",
		office: "CONG. GILA",
		onDuty: true
	},
	{
		fullName: "Santuyo, Rowell P.",
		department: "PGO",
		office: "CONG. ABET"
	},
	{
		fullName: "Supnad, Mario T.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Tiangco, Remigio N.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Ubaldo, Victor B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Valerio, John Dexter D.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Viray - Miranda, Cheryl Laine V.",
		department: "PGO",
		office: "PGO",
		onDuty: true
	},
	{
		fullName: "Zabala, Ma. Theresa Graceila B.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Guevarra, Joann P.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Villegas, Diane Marie R.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Miraflor, Jenneth Mae M.",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Enriquez, Oliver",
		department: "PGO",
		office: "PGO"
	},
	{
		fullName: "Adunay, Nedie S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Alfonso, Princess Jara A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Alsadon, Arnulfo C.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Banzon, Celestino Jr. M.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Banzon, Joseph P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Barrientos, Glenn B.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Betonio, Anthony T.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Blanco, Lester A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Buenaventura, Keith C.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Bundang, Resalde V.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Bunsoy, Mc Donald V.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Bustos, Raul A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Cabral, Maria Linda B.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Caraan, Glenn L.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Caraballos, Shellah M.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Castor, Levin G.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Cruz, Daniel Jr. M.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Cruz, Wilfredo R.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Dabu, Mariel P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "De Guia, Renan Archibal N.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "De Guzman, Aristeo P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "De San Agustin, Gil Sr., A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "De Silva, James Paul G.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Dedicatoria, Gibson F.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Dela Cruz, Karen Kate C.",
		department: "PGSO",
		office: "PMO"
	},
	{
		fullName: "Dela Peña, Reiner O.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Dinglasan, Jeferson B.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Edquiban, Gleen E.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Fabian, Froilan S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Fernandez, Elmer T.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Galdo, John Edward O.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Garidan, Rhon Avic Carlo C.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Gomez, Mamerto D.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Gonzales, Roberto N.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Inocencio, Jaezelle Raye F.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Izon, Lyssa Monique B.",
		department: "PGSO",
		office: "PMO"
	},
	{
		fullName: "Jalober, Joseph Andrew J.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Javier, Jarrell A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Jimenez, Nimfa R.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Jimenez, Reynaldo P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Llanda, Norman R.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Lopez, Lamberto P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Lopez, Yhana Shenyl R.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Madlangbayan, Emma D.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Malibiran, Lorelie L.",
		department: "PGSO",
		office: "PGSO",
		onDuty: true
	},
	{
		fullName: "Manlapaz, Celso B.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Martinez, Anthony S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Maturgo, Dexter R.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Medina, Juanito Jr. R.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Mendoza, Josephine A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Mendoza, Stephanie Rey S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Morales, Bernie V.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Paguio, Leonilo C.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Pajares, David John D.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Palo, Nena G.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Pangilinan, Arnel L.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Perez, Franco P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Pimpinio, Ma. Bella J.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Raganas, Ofelia M.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Reposo, Isidro A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Rodrigo, Joanna Cristina P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Rueda, Jocelyn V.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Sagun, Abmel V.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Samson, Ricardo M.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "San Pedro, Leonardo D.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Santos, Alexis N.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Saroza, Ace G.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Silverio, Joel C.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Soriano, Elmer S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Tan, Oscar Alfonso P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Tanciongco, Fernando E.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Tranate, Reymark R.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Tria, Sophia Maureen T.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Tuazon, Raven Mark M.",
		department: "PGSO",
		office: "PMO"
	},
	{
		fullName: "Tumlos, Rolly N.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Valerio, Dean A.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Viernes, Christian M.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Villaruel, Rochelle P.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Yandoc, Adelaida DC.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Yutiga, Irish - Anne S.",
		department: "PGSO",
		office: "PGSO"
	},
	{
		fullName: "Adejado, Alfredo Jr., A.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Adunay, Manuel D.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Almario, Norbert G.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Andaya, Paulo G.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Andres, Arnel S.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Antolin, Arnel D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Arellano, Almer D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Atuan, Gilmore C.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Bacala, Ace B.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Bacala, John Lerry M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Banzon, Edgar T.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Barrantes, Oliver P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Bautista, Daniel T.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Buensuceso, Romeo V.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Canare, Jerome V.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Carig, Marvin O.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Catacutan, Bruno A.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Crisolo, Arnold P.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Cruz, Alfredo Q.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "De Jesus, Alexis O.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "De Jesus, Jose P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "De Leon, Paolo Leoncio B.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "De Luna, Alfie S.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "De San Agustin, Alfred John J.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Dela Cruz, Kristofferson B.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Dela Paz, John C.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Diverson, Robert N.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Dizon, Jeffrey C.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Duque, Jay Carlos D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Espiritu, Joseph P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Flores, Romeo Jr., P.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Gaffud, Mark Anthony C.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Garcia, Eduardo Sr., M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Gatdula, James Paul D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Gomez, Isaac Jr., V.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Joson, April P.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Juco, Ryan Christian D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Lagidao, Herzon M.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Llanda, Roy Vincent C.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Macalinao, Mclyn I.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Malibiran, Jeffrey D.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Manabat, R-Jay R.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Melano, Jayvee V.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Miranda, Anthony B.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Mojica, Thomas B.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Monzon, Jayson T.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Monzon, Sinfroso M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Navarro, Kenneth Jesy D.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Ongkingco, Randie D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Orilla, Larry Q.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Paguio, Froilan Kenneth R.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Palcat, Francisco D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Palcat, Ramon D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Pantaleon, Jomark D.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Pascual, Joel S.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Pascual, Randy R.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Perillo, Roderick S.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Pineda, Reynaldo Sr., S.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Ragel, John Patrick L.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Restar, Carlos R.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Reyes, Armando Jr., R.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Reyes, Robert V.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Ronquillo, Rhon Jeffrey V.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Rosal, Rodel S.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Ruiz, Rodolfo Jr., L.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Sabaulan, Rene L.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Saliente, Wilson Sr., P.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Samson, Rolando S.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Santos, Kimberly J.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Soriano, Darwin E.",
		department: "PGSO",
		office: "CSIU"
	},
	{
		fullName: "Talastas, Rael M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Tigas, Kasper M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Tolentino, Mark Joseph M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Torres, Alberto U.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Trajano, Ernesto I.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Yambao, Marlon M.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Zapanta, Roman P.",
		department: "PGSO",
		office: "CSIU",
		onDuty: true
	},
	{
		fullName: "Castro, Mark George D. ",
		department: "PGSO",
		office: "PMO"
	},
	{
		fullName: "Atienza, Lorena R.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Austria, Jonna Jane J.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Bangco, Kimberly P.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Bernardo, Corazon S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Bornolia, Jemuel B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Buccahan, Rosanna M.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Calumno, Robert C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Corpus, Jesus M.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Crisolo, Ramon A.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Dela Cirna, Eduardo R.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Diaz, Adelfredo S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Domingo, Alson Jun P.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Galang, Angelica Irish E.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Gatdula, Ran-Ran",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Gonzales, Emily L.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Hermosa, Melissa L.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Hidalgo, Jefferson N.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Ibasco, Gabriel M.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Lacanilao, Rhodora G.",
		department: "PHO",
		office: "BGHMC"
	},
	{
		fullName: "Limcumpao, Raquel O.",
		department: "PHO",
		office: "BGHMC"
	},
	{
		fullName: "Lising, Jonel S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Maglaque, Roberto L.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Malibunas, Karen B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Manahan, Bernadette R.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Margallo, Irene Joy D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Mencias, Clarence C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Nardo, Reynaldo C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Noveda, Jocelyn A.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Ortiguerra, Perlita P.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Payawal, Julie Ann H.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Pelaez, Catherine D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Ramirez, Eugenio C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Ramirez, Rigor V.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Sales, Esmeralda M.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Samson, Donna S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Suguitan, Mary Anne R.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Tanega, Rowena F.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Tumbaga, Ramil B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Tumlos, Fatima C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Valderama, Petronila B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Valencia, Ferdinand B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Villanueva, Aileen S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Villaruel, Sarah D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Bugay, Patrick Joseph C.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "De Guzman, John Gabriel D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Dela Rosa, Annaleah T.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Dela Rosa, Jonas I.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Duraliza, Philippe Jhordan E.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Garcia, Karen Grace S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Izon, Aubrey S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Javier, John Joseph D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Manalo, Kathrina S.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Mendoza, Charize B.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Quezon, Glennette P.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Rocacorba, Criselda M.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Reyes, Ruth Ann D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Teopengco, Mark Hill P.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Celestino, Luisito D.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Estepa, Lovely Ann F.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Isberto, Maria Concepcion T.",
		department: "PHO",
		office: "PHO"
	},
	{
		fullName: "Almario, Amelia G.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Anilao, Melody B.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Basa, Augusto Jr., R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Bautista, Jaminah Jane R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Cayanan, Lorena L.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Cochon, Merly D.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Cochon, Wilfrido Jr., J.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Cornejo, Conrad James N.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Dela Rosa, Marilyn J.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Enriquez, Luz R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Gatdula, Ted Albert R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Ilaya, Arren Ryan B.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Magsino, Lauder Dale R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Pineda, Christer Rose C.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Pitogo, Matthew A.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Rodrigo, Alfredo Jr. M.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Roque, Maria Jocelyn G.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Salvador, Rolando S.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Tolentino, Amiel R.",
		department: "PHRMO",
		office: "PHRMO"
	},
	{
		fullName: "Aberin, Lyn Kim M.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Barquin, Arlyn M.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Cervantes, Michael Angelo A.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Cigaral, Michael R.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Cruz, Kyra Jean T.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Dizon, Christian Jorge R.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Griva, Romer L.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Lara, Angeline OL.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Mangalindan, Jaime Z.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Marcelo, Maria Vinnise A.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Ochoa, Jan Raven L.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Paras, Ray Christian U.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Quizon, James B.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Refraccion, Gregorio O.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Reso, Mirhea Lyzette P.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Reyes, Allan Josjua T.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Rodriguez, Christian C.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Samson, Micho D.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Seeckts, Oliver Von G.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Soriano, Zenaida M.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Delas Alas, Mar Jay S.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Malit, Geneva B. ",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Pizarro, Ma. Shirley M.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Rubiano, Aida R.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Verallo, Monica Florence B.",
		department: "PIO",
		office: "PIO"
	},
	{
		fullName: "Asilo, John Carlo S.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Bringula, Hydie D.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "David, Jimmy M.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "De Jesus, Arsenio W.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Dela Rosa, Arlene M.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Estrella, Ryan D.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Imperial, Pio P.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Orani, Jamie Boy D.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Padre, Jojit C.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Rafael, Jemer M.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Refuerzo, Mark Jester P.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Rodriguez, Mark Raymond A.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Tiangco, Rem Michael L.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Villaflores, Bien Carlo L.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Villanueva, Daisy S.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Nuestro, Paolo H.",
		department: "PITO",
		office: "PITO"
	},
	{
		fullName: "Adraneda, Pauline Gaine C.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Aragon, Joana Mae C.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Atentar, Raul II P.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Banzon, Jose Gabriel Immanuel G.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Bautista, Aldren M.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Beredico, Maria Noeh S.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Bugay, Frank Rainier T.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Cariaso, Darwin B.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Coronel, Michael",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Corpuz, Acces D.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Dela Cruz, Mara Joy D.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Dela Peña, Lucita B.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Dela Torre, Adazet Love T.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Dilig, Angel Brian P.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Hina, Maria Carmelita R.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Larion, Arjay G.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Medina, Alfred Bien T.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Ocampo, Jap R.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Orani, Imelda D.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Punzalan, Paulo Dominic C.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Simplicio, Carmela Grace T.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Valerio, Mc Jefferson M.",
		department: "PPDO",
		office: "PPDO"
	},
	{
		fullName: "Arsenio, Dannah T.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Bergado, Antonio N.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Calma, Alex B.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Candelaria, Madel G.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Concepcion, Andrea Luz E.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "De Guzman, Daisy Lou A.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Del Mundo, Friacianne Kate P.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Escartin, Ma. Rudilyn L.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Espiritu, Camille M.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Garcia, Will Ann M.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Higonia, Mario Y.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Jalober, Ara Niña S.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Mamangon, Roynell R.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Mas, Resvan Farah L.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Molinar, Desiree T.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Ocampo, Rosario D.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Palaypay, Sarah A.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Perez, Val Jospeh Z.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Pimpinio, Jordan J.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Ragel, Marietta Q.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Verdida, Rossana P.",
		department: "PPO",
		office: "PPO"
	},
	{
		fullName: "Aguylo, Mercedita V.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Angco, Mary Rose S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Baluyot, Gian Irish R.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Banzon, Norma T.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Bartolome, Jayson D.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Caladiao, Catherine May D.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Carandang, Eugene Kenneth T.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Cortez, Cindy A.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Datu, Lorielyn A.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "David, Ma. Cristina P.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "David, Sheradel S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "De Mesa, Maridaine V.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Dela Cruz, Criselda Kamill V.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Dela Peña, Emma M.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Dupilas, Jovito A.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Duque, Cindy A.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Enrile, Merriam Marie Q.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Enriquez, Aileen D.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Ferma, Christina May T.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Garcia, Cyrelle John S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Garcia, Hanzel Reiko G.",
		department: "PSWDO",
		office: "YDO"
	},
	{
		fullName: "Garcia, Ma. Concepcion R.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Lapeña, Arlene S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Lopez, Maria Cristina V.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Mandane, Joseph L.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Mena, Jocelyn S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Nate, Mary Grace P.",
		department: "PSWDO",
		office: "YDO"
	},
	{
		fullName: "Pugal, Kent Allenn S.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Reñosa, Ma. Ranessa R.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Reyes, Meynard Bryan Z.",
		department: "PSWDO",
		office: "YDO"
	},
	{
		fullName: "Roque, Dolores A.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Roxas, Armilyn I.",
		department: "PSWDO",
		office: "YDO"
	},
	{
		fullName: "Rubiano, Joie Dee R.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Salenga, Aileen D.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Santos, Wiezel F.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Simsuangco, Japs V.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Sta. Maria, Riah C.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Tranate, Farida M.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Valencia, Maria Luisa O.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Valerio, Gabriel P.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Vitug, Shiela Mae J.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Zulueta, Riza O.",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Baysan, Charisma",
		department: "PSWDO",
		office: "PSWDO"
	},
	{
		fullName: "Aala, Lorela G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Adap, Melody D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Alarcon, Neiljan P.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Aquino, Ursula C.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Baltazar, Gian Robert D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Banzon, Janice P.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Banzon, Ronaldo S.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Bautista, Mara Jessel B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Befetel, Ma. Bethina M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Belanio, Majirel M.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Benitez, Glennie Rose S.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Bernaldo, Juanito B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Cacanando, Danica D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Capuli, Juan Karmelo A.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Carlos, Maria Rosario R.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Casitas, Michelle G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Cayanan, Merlie Anne L.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "De Guzman, Angeli Dianne D.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Dilig, Ma. Lourdes B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Dizon, Liezl C.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Dizon, Mary Jane R.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Dolor, Ednel Joy L.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Estrella, Jeizel Mariel Luz M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Fabregas, Samuel Dale C.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Flores, Cyreil Joy D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Franco, Ma. Aneline M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Geronia, Ruby M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Gloria, Charmeen S.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Guevarra, Jonalyn B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Guinto, Mylene R.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Hipolito, Guada S.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Labinghisa, Meriel Erika M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Layug, Aldrin C.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Leron, Armelia D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Lintag, Marilyn F.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Ma, Nerry Natalie E.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Macatuno, Emmanuel S.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Magpantay, Alicia R.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Magpoc, Cristina Z.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Manalo, Eloisa E.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mangaliman, Sabina B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mendoza, Eleanor S.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mendoza, Gladdys G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mendoza, Karen G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mendoza, Regine P.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mendoza, Renz Arienne M.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mojeca, Beverly B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Mullasgo, Iryn F.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Naguit, Mhark Eugene Q.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Nisay, Virgilio G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Nucom, Rose Ann B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Owel, Melbrin O.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Peña, Mary Lynne C.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Peralta, Mary Ann L.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Pomer, Jocelyn D.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Pomer, Emiliano S.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Puno, Ma. Corazon Gil B.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Ramos, Nikki Lois V.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Regencia, Rodian Venzon C.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Roque, Lysa S.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Santiago, Villavert M.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Sultan, Alberto G.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Tiongson, Erson B.",
		department: "PTO",
		office: "PTO",
		onDuty: true
	},
	{
		fullName: "Triguero, Marivic T.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Tuazon, Joelyn May A.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Valencia, Karen A.",
		department: "PTO",
		office: "PTO"
	},
	{
		fullName: "Abara, Nerlisa M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Alamo, John Ralph B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Anicete, Joel C.",
		department: "SP",
		office: "SP",
		onDuty: true
	},
	{
		fullName: "Arellano, Rowena F.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Baluyot, Jenifer J.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Banzon, Jacqueline S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Banzon, Jovy Z.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Bartolaba, Cerrelyn D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Bascao, Francesca Ann G.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Batungbacal, Alvin Simone Z.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Beltran, Leslie S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Beltran, Manuel N.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Calina, Emmanuel",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Cando, Christopher Ray B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Canlas, Jomar P.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Coronel, Guillermo B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Cudia, Jem Krizzel S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Custodio, Patrick Loubert B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "De Asis, Jeoffrey A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "De Jesus, Mary Ann R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "De Vega, Rolando D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Del Rosario, Bryan Xavier L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Del Rosario, Romano L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Dela Cruz, Merrie Ann Jo D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Ejanda, Joann D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Espeleta, Roman Harold R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Estanislao, Jorge S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Estrella, Josephine M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Flores, Melissa D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Galang, Ricardo Jr. F.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Galicia, Fidel B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Garcia, Antonio Winston M.",
		department: "SP",
		office: "SP",
		onDuty: true
	},
	{
		fullName: "Garcia, Eduardo Jr. M.",
		department: "SP",
		office: "SP",
		onDuty: true
	},
	{
		fullName: "Garcia, Ma. Cristina M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Garcia, Marlene R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gatdula, Natividad D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gaynilo, Mia Trinna N.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gaza, Jomar L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gaza, Melencio Jr. L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gomez, Rodolfo L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Guinto, Jose Gerry M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Gunio, Edwin B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Guzman, Rosauro Jr. F.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Herrera, Ma. Jimlet Z.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Herrera, Maria Paz P.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Hipolito, Helen T.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Inales, Josel Francis A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Isidro, Armen S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Jacob, Eloisa H.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Lago, Richard D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Larman, Domingo Jr. O.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Lezada, Emelita B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Lintag, Kenetton Joe Ward A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Llanda, Jorizcen C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Loreto, James R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Luna, Gerlie N.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Mactal, Pinky B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Magay, Feliciano Jr. G.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Magpantay, Ana Joy E.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Magsakay, Kaiser R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Mangubat, Renato Jr. G.",
		department: "SP",
		office: "SP",
		onDuty: true
	},
	{
		fullName: "Mendoza, Minaflor T.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Miranda, Cristina C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Montemayor, Noli M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Monton, Randy Boy G.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Morales, Rosario C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Paja, Jayvee N.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Pangan, Robert T.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Perez, Omar C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Pincil, Marissa J.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Poblete, Lovely Joy",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Quezon, Mark Lorenz C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Quimlat, May A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Quitalig, Liza V.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Ramirez, Rex D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Ramos, Dana May M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Ramos, Genneveb L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Reyes, Christian Philip C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Reyes, JC Q.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Roman, Antonino III B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Ronquillo, Ma. Diwani V.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Roque, Maria Margarita R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Salazar, Steven V.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sangalang, Roxane R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Santos, Nahum E.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sarili, Maria Jesusa M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sevilla, Desiree S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sevilla, Felizardo D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sumala, Alfredo B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Sunga, Angelito M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Tabarnilla, Ansil B.",
		department: "SP",
		office: "SP",
		onDuty: true
	},
	{
		fullName: "Tallada, Jencynel B.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Teopengco, Jeremy Ann A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Tigas, Mary Grace M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Tuason, Amafil Mon D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Valdecañas, Noel Joseph L.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Valencia, Janelle Mei V.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Valencia, Shannen Meyl P.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Valerio, Alyssa E.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Valerio, Rina M.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Vasallo, Ryan S.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Vequizo, Jo Ann R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Verdida, Allan P.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Vida, John Cedric A.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Zabala, Roxan R.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Baluyot, Gerald Francis C.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Belencion, Pedro D.",
		department: "SP",
		office: "SP"
	},
	{
		fullName: "Alonto, Abul Khayr Amalon II M.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Batac, Jesalie D.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Bautista, Efren P.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Cayabyab, Mary Elizabeth B.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Cordero, Christian A.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Cordova, Jeffrey P.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Cruz, Mary Louise P.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Dolor, Edgar Arvin L.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Guevarra, Rey Christopher G.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Jaime, Clouie Ann D.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Labios, Riell Aimiel P.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Torio, Millette E.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Tuazon, Jose Martin B.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Valentos, Maria Angelica P.",
		department: "PPPIC",
		office: "PPPIC"
	},
	{
		fullName: "Co, Benjamin Lewis C.",
		department: "PPPIC",
		office: "PPPIC",
		onDuty: true
	},
	{
		fullName: "Dela Cruz, Jez G.",
		department: "PPPIC",
		office: "PPPIC",
		onDuty: true
	},
	{
		fullName: "Alipio, Jasmin C.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Austria, Christine Gale O.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Basilio, Joseph G.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Bautista, Andres B.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Cabarles, Ma.Cristina A.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Canare, Amelita E.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Crisolo, James Aldrin N.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "David, Dara Andrea Rose M.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Dela Cruz, Jeremiah B.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Dela Rosa, Rosalinda A.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Dizon, Ryan B.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Dominguez, Thelma A.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Doplon, Dominic B.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Enriquez, John Paul G.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Ladra, Ronald Allan A.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Leaño, Grace R.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Lingad, Earl Anthony M.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Lopez, Ginette R.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Manabat, Roberto Jr. R.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Merla, Jayper P.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Miranda, Patricia Gail R.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Mondragon, Wilson II Jr., A.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Nojadera, Nivea N.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Palaypay, Rochelle R.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Panganiban, Mel Irish R.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Pantaleon, Charito S.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Sardia, Federico R.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Sugatain, Alejandro S.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Sugatain, Azucena E.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Tigas, Danica Lolita C.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Tomas, Corazon B.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Urbano, Arnold C.",
		department: "TOURISM",
		office: "TOURISM"
	},
	{
		fullName: "Cayetano, Vilma M.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Gamalinda, Carla T.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Nojadera, Cesar G.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Pista, Melody P.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Repancol, Rona Catherine R.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Sison, Alfie T.",
		department: "TOURISM",
		office: "CHPD"
	},
	{
		fullName: "Adona, Vien Cain S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Buensuceso, Gladys D.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Cruz, Earvin Randolph D.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "David, John Edler C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Dayrit, Richie R.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "De Leon, Agatha Pauline C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "De Leon, Elviza D.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "De Leon, Neil M.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Diego, Austin V.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Flores, Alyssa Beatrice S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Fontillas, Vee-Esther R.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Gara, Ma. Dolores M.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Isidro, Arnel C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Layug, Mariel A.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Lozano, Karlo Val G.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Medina, Romar Je A.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Mendoza, Moises L.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Molina, Danval Mc Lyn L.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Ramos, John Carlou I.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Reyes, Rogelio L.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Roman, Jerry S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Sabino, Freidpal Mae S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "San Diego, Edmond C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "San Jose, Joseph C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Tallorin, Trinidad G.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Tanega, Jemuelle S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Tarayao, Edgar Genesis P.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Tripon, Louie G.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Velasco, Kenneth C.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Venturina, Alberto S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Vitug, Joshua Andrei D.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Zulueta, Emmanuel S.",
		department: "VETERINARIAN",
		office: "VETERINARIAN"
	},
	{
		fullName: "Tordera, Ryan Jay S.",
		department: "PGO-OTHERS",
		office: "Integrated Bar"
	},
	{
		fullName: "Canoy, Airez Christian S.",
		department: "PGO-OTHERS",
		office: "COMELEC"
	},
	{
		fullName: "Cruz, Kharl John C.",
		department: "PGO-OTHERS",
		office: "COMELEC"
	},
	{
		fullName: "Reyes, Manuel S.",
		department: "PGO-OTHERS",
		office: "COMELEC"
	},
	{
		fullName: "Alonzo, Jonathan John J.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Aquino, Mary Claire C.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Basilio, Jomari G.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Bustamante, Patricia Shane F.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Dela Rosa, Dimple B.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Dominguez, Xamanylle Shane B.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Panogan, Shiela S.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Robles, Lorenzo H.",
		department: "PGO-OTHERS",
		office: "Commission on Audit"
	},
	{
		fullName: "Actub, Hector C.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Advincula, Aldren I.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Barcela, Christian Lee S.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Garcia, Rachelle Anne B.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Gayon, Argel Jovi W.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Grande, Vannie Jane M.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Italia, Jerald V.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Lacanilao, Ginalyn Z.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Lobo, Alyssa Astra S.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Mactal, Celeste B.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Navales, Avegail V.",
		department: "PGO-OTHERS",
		office: "Cong. Jernie Jett V. Nisay"
	},
	{
		fullName: "Aguilar, Ailyn C.",
		department: "PGO-OTHERS",
		office: "Cong. Maria Angela S. Garcia",
		onDuty: true
	},
	{
		fullName: "Bertulano, Ralph Matthew C.",
		department: "PGO-OTHERS",
		office: "Cong. Maria Angela S. Garcia",
		onDuty: true
	},
	{
		fullName: "Duero, Harley B.",
		department: "PGO-OTHERS",
		office: "Cong. Maria Angela S. Garcia",
		onDuty: true
	},
	{
		fullName: "Gacutan, Mairine D.",
		department: "PGO-OTHERS",
		office: "Cong. Maria Angela S. Garcia",
		onDuty: true
	},
	{
		fullName: "Sebastian, Gerald M.",
		department: "PGO-OTHERS",
		office: "Cong. Maria Angela S. Garcia",
		onDuty: true
	},
	{
		fullName: "Dacuycuy, Crisanto M.",
		department: "PGO-OTHERS",
		office: "Philippine Red Cross",
		onDuty: true
	},
	{
		fullName: "Malibiran, Reihzel Anne O.",
		department: "PGO-OTHERS",
		office: "Philippine Red Cross",
		onDuty: true
	},
	{
		fullName: "Payawal, Michael G.",
		department: "PGO-OTHERS",
		office: "Philippine Red Cross",
		onDuty: true
	},
	{
		fullName: "Simbol, Madonna V.",
		department: "PGO-OTHERS",
		office: "Philippine Red Cross",
		onDuty: true
	},
	{
		fullName: "Villadolid, Rossana P.",
		department: "PGO-OTHERS",
		office: "Capitol Post Office"
	},
	{
		fullName: "Gaspar, Daisy M.",
		department: "PGO-OTHERS",
		office: "CIDG Field Unit Bataan"
	},
	{
		fullName: "Mandi, Jesca Mae C.",
		department: "PGO-OTHERS",
		office: "CIDG Field Unit Bataan"
	},
	{
		fullName: "Mifania, Enar S.",
		department: "PGO-OTHERS",
		office: "LEGAL - PUBLIC ATTORNEYS OFFICE"
	},
	{
		fullName: "De Jesus, Richard M.",
		department: "PGO-OTHERS",
		office: "LEGAL - MCTC - BRANCH 01 (DINALUPIHAN-HERMOSA)"
	},
	{
		fullName: "Macarubbo, Edna L.",
		department: "PGO-OTHERS",
		office: "LEGAL - MCTC - BRANCH 01 (DINALUPIHAN-HERMOSA)"
	},
	{
		fullName: "Macaspac, Walter A.",
		department: "PGO-OTHERS",
		office: "LEGAL - MCTC - ABUCAY"
	},
	{
		fullName: "Reyes, Den Mark F.",
		department: "PGO-OTHERS",
		office: "LEGAL - MCTC - ORANI - SAMAL"
	},
	{
		fullName: "Agustin, Jamie Lee B.",
		department: "PGO-OTHERS",
		office: "LEGAL - PROV'L PROSECUTORS OFFICE"
	},
	{
		fullName: "Magsombol, Arriane O.",
		department: "PGO-OTHERS",
		office: "LEGAL - PROV'L PROSECUTORS OFFICE"
	},
	{
		fullName: "Razon, Sean Anthony A.",
		department: "PGO-OTHERS",
		office: "LEGAL - PROV'L PROSECUTORS OFFICE"
	},
	{
		fullName: "Sanchez, Dennis C.",
		department: "PGO-OTHERS",
		office: "LEGAL - PROV'L PROSECUTORS OFFICE"
	},
	{
		fullName: "Gatdula, Maria Romelita D.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 02 (BALANGA FAMILY COURT)"
	},
	{
		fullName: "Pineda, Von Isaac C.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 02 (BALANGA FAMILY COURT)"
	},
	{
		fullName: "Monte De Ramos, Chino G.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 02 (BALANGA)"
	},
	{
		fullName: "Flores, Camille Glen G.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 03 (BALANGA)"
	},
	{
		fullName: "Vargas, Lorny T.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 03 (BALANGA)"
	},
	{
		fullName: "Pineda, Cristina G.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 03 (MARIVELES FAMILY COURT)"
	},
	{
		fullName: "Mendoza, Andre G.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 04 (MARIVELES)"
	},
	{
		fullName: "Tablan, Joseph T.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 05 (DINALUPIHAN)"
	},
	{
		fullName: "Hernandez, Maricel L.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 92 (BALANGA)"
	},
	{
		fullName: "Quiambao, Jasper  N.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 93 (BALANGA)"
	},
	{
		fullName: "Lopez, Joseph S.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - BRANCH 94 (MARIVELES)"
	},
	{
		fullName: "Tomas, Alyssa G.",
		department: "PGO-OTHERS",
		office: "LEGAL - RTC - (CLERK OF COURT) - DINALUPIHAN "
	},
	{
		fullName: "Tactay, Rodrigo B.",
		department: "PGO-OTHERS",
		office: "MUN - CITY OF BALANGA ",
		onDuty: true
	},
	{
		fullName: "Artuz, Rogelio D.",
		department: "PGO-OTHERS",
		office: "MUN - PILAR "
	},
	{
		fullName: "Santos, Fernando Jr., M.",
		department: "PGO-OTHERS",
		office: "MUN - PILAR "
	},
	{
		fullName: "Solano, Noel T.",
		department: "PGO-OTHERS",
		office: "MUN - PILAR "
	},
	{
		fullName: "Catalan, Virgilio S.",
		department: "PGO-OTHERS",
		office: "MUN - ORION"
	},
	{
		fullName: "Rosete, Bernardo Q.",
		department: "PGO-OTHERS",
		office: "MUN - ORION"
	},
	{
		fullName: "Santiago, Ranilo A.",
		department: "PGO-OTHERS",
		office: "MUN - ORION"
	},
	{
		fullName: "Villanueva, Normita A.",
		department: "PGO-OTHERS",
		office: "MUN - ORION"
	},
	{
		fullName: "Mariano, Jovita Q.",
		department: "PGO-OTHERS",
		office: "MUN - LIMAY "
	},
	{
		fullName: "Baysa, Amilyn T.",
		department: "PGO-OTHERS",
		office: "MUN - MARIVELES"
	},
	{
		fullName: "Eslaga, Diana I.",
		department: "PGO-OTHERS",
		office: "MUN - MARIVELES"
	},
	{
		fullName: "Guillermo, Grace Lyn M.",
		department: "PGO-OTHERS",
		office: "MUN - MARIVELES"
	},
	{
		fullName: "Moselina, Jonalyn B.",
		department: "PGO-OTHERS",
		office: "MUN - MARIVELES"
	},
	{
		fullName: "Orola, Marjorie B.",
		department: "PGO-OTHERS",
		office: "MUN - MARIVELES"
	},
	{
		fullName: "Bantugan, Marcelo B.",
		department: "PGO-OTHERS",
		office: "MUN - BAGAC"
	},
	{
		fullName: "Flores, Pamela M.",
		department: "PGO-OTHERS",
		office: "MUN - BAGAC"
	},
	{
		fullName: "Alarcon, Hermie M.",
		department: "PGO-OTHERS",
		office: "MUN - DINALUPIHAN "
	},
	{
		fullName: "Alvarado, Virgilio E.",
		department: "PGO-OTHERS",
		office: "MUN - DINALUPIHAN ",
		onDuty: true
	},
	{
		fullName: "Diwa, Leonardo P.",
		department: "PGO-OTHERS",
		office: "MUN - DINALUPIHAN ",
		onDuty: true
	},
	{
		fullName: "Legaspi, Lito M.",
		department: "PGO-OTHERS",
		office: "MUN - DINALUPIHAN "
	},
	{
		fullName: "Lobo, Edwin M.",
		department: "PGO-OTHERS",
		office: "MUN - DINALUPIHAN ",
		onDuty: true
	},
	{
		fullName: "Bernaldo, Jasper P.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - BIR"
	},
	{
		fullName: "Gallardo, Arlene R.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - BIR"
	},
	{
		fullName: "Magsino, Wilma D.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - BIR"
	},
	{
		fullName: "Tiglao, Carmela M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - BIR"
	},
	{
		fullName: "Bartolome, John Loyd B.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - CSC"
	},
	{
		fullName: "Canlas, Alexis Anne M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - CSC"
	},
	{
		fullName: "Agustin, Carlos M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - DRUG REHAB CENTER"
	},
	{
		fullName: "Mallari, Miguel II M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - DRUG REHAB CENTER"
	},
	{
		fullName: "Alonzo, Nerina Mikee R.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani"
	},
	{
		fullName: "Blanco, Ellieh Rose R.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Enalpe, Aljon E.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Ferrer, Ferdinand Jr. R.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Garduque, Salome A.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Llamzon, Reinnier John C.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Mangalindan, Emmanuel Guillermo H.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Mariano, Regalado Q.",
		department: "PGO-OTHERS",
		office: "NBI District Office - Orani",
		onDuty: true
	},
	{
		fullName: "Crespo, Ashley C.",
		department: "PGO-OTHERS",
		office: "NBI Satellite Office - FAB ",
		onDuty: true
	},
	{
		fullName: "Guiang, Jonathan R.",
		department: "PGO-OTHERS",
		office: "NBI Satellite Office - FAB ",
		onDuty: true
	},
	{
		fullName: "Roldan, Rocky Ross R.",
		department: "PGO-OTHERS",
		office: "NBI Satellite Office - FAB ",
		onDuty: true
	},
	{
		fullName: "Soriano, Mercy N.",
		department: "PGO-OTHERS",
		office: "NBI Satellite Office - FAB ",
		onDuty: true
	},
	{
		fullName: "Aquino, Kevin Brian M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Atienza, Evangeline M.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Dela Cruz, Jeffrey Efraim R.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION ",
		onDuty: true
	},
	{
		fullName: "Dela Rosa, John Marth C.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Reyes, Mary Joy P.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Velasco, Via Viance Percie D.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Vergara, Oliver D.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - NATIONAL BUREAU OF INVESTIGATION "
	},
	{
		fullName: "Vinzon, Mahinhin P.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - REGISTRY OF DEEDS"
	},
	{
		fullName: "Alvarez, Jhonnalyn L.",
		department: "PGO-OTHERS",
		office: " Natl Agency - PNP (Highway Patrol Group)"
	},
	{
		fullName: "Yuzon, Clarisse Fatima V.",
		department: "PGO-OTHERS",
		office: "NATL AGENCY - (PHILIPPINE DRUG ENFORCEMENT AGENCY)"
	},
	{
		fullName: "Alfonso, Kelvin H.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Bataan Parole and Probation Administration "
	},
	{
		fullName: "Pastor , Katrina S.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Bataan Parole and Probation Administration "
	},
	{
		fullName: "Rubiano, Romina S.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Bataan Parole and Probation Administration "
	},
	{
		fullName: "Dimla, Jerryme N.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Jacinto, Romel John R.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Mondragon, Corazon A.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Pasiliao, Michael N.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Ruiz, Anita D.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Samson, Lorna T.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Tigas, Perlinda B.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Tria, Danilo P.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Tuazon, Charito S.",
		department: "PGO-OTHERS",
		office: " Natl Agency - Philippine National Police"
	},
	{
		fullName: "Lopez, Renato F.",
		department: "PGO-OTHERS",
		office: " Natl Agency - PNP (Crime Lab)"
	},
	{
		fullName: "Tasic, Mikhael A.",
		department: "PGO-OTHERS",
		office: " Natl Agency - PNP (Crime Lab)"
	},
	{
		fullName: "Tacderan, Romeo B.",
		department: "PGO-OTHERS",
		office: " Natl Agency - PNP (Crime Lab)"
	},
	{
		fullName: "Aviles , Ma.Isabel  D.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Idalo, Julie Ann G.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Nonay , Lencis  D.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Ponpon , Danica Bianca  R.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE"
	},
	{
		fullName: "Resnera, Zaira A.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE"
	},
	{
		fullName: "Rosete, Mei-Anne B.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE"
	},
	{
		fullName: "Solano, Maricel C.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Soria, Cleobelle M.",
		department: "PGO-OTHERS",
		office: "MDH VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Loyola , Beverly  A.",
		department: "PGO-OTHERS",
		office: "AFAB VACCINATION SITE",
		onDuty: true
	},
	{
		fullName: "Timpog , Marjorie Kim A.",
		department: "PGO-OTHERS",
		office: "AFAB VACCINATION SITE",
		onDuty: true
	}
];

const main = async () => {
	const client = postgres(process.env.DATABASE_URL as string);
	const db = drizzle(client);

	const data: (typeof employees.$inferInsert)[] = [];

	console.log(masterlist.length);

	const departmentIds = await db
		.select({
			id: departments.id,
			name: departments.name
		})
		.from(departments);

	for (const employee of masterlist.slice(1500, 3000)) {
		const department = departmentIds.find((d) => d.name === employee.department);

		if (department) {
			data.push({
				name: employee.fullName.toUpperCase(),
				office: employee.office.toUpperCase(),
				departmentId: department.id,
				onDuty: employee.onDuty
			});
		}
	}

	console.log("Seed start");
	await db.insert(employees).values(data);
	console.log("Seed done");
};

main();
