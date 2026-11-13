import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , FlatList} from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: "E01", titre: "Atelier React", categorie: "Atelier", capacite: 25, inscrits: 25 },
  { id: "E02", titre: "Conference IA", categorie: "Conference", capacite: 70, inscrits: 52 },
  { id: "E03", titre: "Securite mobile", categorie: "Atelier", capacite: 20, inscrits: 17 },
  { id: "E04", titre: "Design UI", categorie: "Atelier", capacite: 18, inscrits: 9 },
  { id: "E05", titre: "Forum projets", categorie: "Rencontre", capacite: 50, inscrits: 49 },
  { id: "E06", titre: "Decouverte Git", categorie: "Atelier", capacite: 24, inscrits: 24 },

];
  
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}


function statutEvenement(e: Evenement): string {
  const r = placesRestantes(e);

  if (r === 0) {
    return "Complet";
  } else if (r <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }
}
const nombreTotal = evenements.length;

const nombreComplets = evenements.filter(
  e => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e), 0
);

const ateliersDisponibles = evenements.filter(
  e => e.categorie === "Atelier" && placesRestantes(e) > 0
);
const mode = "ateliers";
const evenementsAffiches =
  mode === "tous" ? evenements : ateliersDisponibles;
type BadgeEtatProps = {
  statut: string;
};


function BadgeEtat({ statut }: BadgeEtatProps) {
  const couleur =
    statut === "Complet" ? "#fecaca" :
    statut === "Presque complet" ? "#fed7aa" :
    "#bbf7d0";

  return (
    <Text style={{ color: couleur }}>
      {statut}
    </Text>
  );
}
type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={{
  padding: 15,
  marginBottom: 12,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  width: "100%",
  alignSelf: "center",
}}>
      <Text>{evenement.titre}</Text>
      <Text>Catégorie : {evenement.categorie}</Text>
      <Text>Places restantes : {places}</Text>
      <BadgeEtat statut={statut} />
    </View>
  );
}

type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({ libelle, nombre }: BlocStatistiqueProps) {
  return (
    <View style={{
      padding: 15,
      backgroundColor: "#EAF2FF",
      borderRadius: 12,
      margin: 5,
      alignItems: "center" }}>
      <Text>{libelle}</Text>
      <Text>{nombre}</Text>
    </View>
  );
}


export default function App() {

  return (
<View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titre}>CampusAgenda</Text>
        <Text style={styles.sousTitre}>
          Événements du campus
        </Text>
      </View>
      <View style={styles.statistiques}>
        <BlocStatistique
          libelle="Événements au total"
          nombre={nombreTotal}
        />
        <BlocStatistique
          libelle="Événements complets"
          nombre={nombreComplets}
        />
        <BlocStatistique
          libelle="Événements avec des places"
          nombre={nombreAvecPlaces}
        />
        <BlocStatistique
          libelle="Total des places restantes"
          nombre={totalPlacesRestantes}
        />
      </View>
      <Text style={styles.titreSection}>
  {mode === "tous"? "Tous les événements": "Ateliers disponibles"}
</Text>
<FlatList
  data={evenementsAffiches}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <CarteEvenement evenement={item} />
  )}

ListEmptyComponent={
  <Text style={styles.messageVide}>
    Aucun événement à afficher.
  </Text>
}
/>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  titre: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2456A6",
  },

  sousTitre: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  statistiques: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titreSection: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2456A6",
    marginBottom: 12,
  },
messageVide: {
  textAlign: "center",
  color: "#666666",
  fontSize: 16,
  marginTop: 20,
},
});