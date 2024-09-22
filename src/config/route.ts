export const linksTab = [
  {
    title: "Tableau de bord",
    links: [
      { icon: "PieChart", path: "/general", name: "Géneral" },
      { icon: "LineChart", path: "/performance", name: "Performance" },
      { icon: "Folder", path: "/rentabilite", name: "Rentabilité" },
    ],
  },
  {
    title: "utilisateur",
    links: [
      { icon: "User", path: "/client", name: "Clients" },
      { icon: "UserCheck", path: "/employee", name: "Collaborateurs" },
      { icon: "UserPlus", path: "/prestataire", name: "Prestataires" },
    ],
  },
  {
    title: "service",
    links: [
      {
        icon: "Briefcase",
        path: "/services/administration",
        name: "Administration",
      },
      { icon: "DollarSign", path: "/services/fiscal", name: "Fiscal" },
      { icon: "Gavel", path: "/services/juridique", name: "Juridique" },
      { icon: "Users", path: "/services/social", name: "Social" },
      { icon: "Beaker", path: "/services/expertise", name: "Expertise" },
      { icon: "Ear", path: "/services/audit", name: "Audit" },
      { icon: "BookCopy", path: "/services/formation", name: "Formation" },
    ],
  },
  {
    title: "CONFIGURATION",
    links: [
      { icon: "MailQuestion", path: "/support", name: "Supports" },
      {
        icon: "UserRoundCog",
        path: "/configuration",
        name: "Utilisateur",
        items: [
          { path: "/configuration/utilisateur", name: "Utilisateurs" },
          { path: "/configuration/grade", name: "Grade" },
          { path: "/configuration/groupe", name: "Groupes" },
          { path: "/configuration/page", name: "Pages" },
          { path: "/configuration/uri", name: "URIs" },
        ],
      },
      {
        icon: "HandPlatter",
        path: "/service",
        name: "Service",
        items: [
          { path: "/service/services", name: "Service" },
          { path: "/service/sous-service", name: "Sous service" },
        ],
      },
      {
        icon: "Settings",
        path: "/parametre-lettre",
        name: "Lettre mission",
        items: [
          { path: "/parametre-lettre/typedoc", name: "Type" },
          { path: "/parametre-lettre/grille", name: "Grille tarifaire" },
          { path: "/parametre-lettre/frais", name: "Frais" },
        ],
      },
      {
        icon: "FileCog",
        path: "/parametre-dossier",
        name: "Dossiers",
        items: [
          { path: "/parametre-dossier/tache", name: "Tâche" },
          { path: "/parametre-dossier/equipe", name: "Equipe" },
        ],
      },
    ],
  },
];

export const linksProfile = [
  { icon: "UserPen", path: "/profile/view", name: "Voir profil" },
  { icon: "LogOut", path: "/profile/logout", name: "Deconnexion" },
];
