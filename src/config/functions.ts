function getValueByKey(obj: any, key: string) {
  const keys = key.split("."); // Divise la clé en tableau ["job", "name"]
  let value = obj;

  for (const k of keys) {
    value = value[k]; // Accède à la valeur de chaque niveau
    if (value === undefined) {
      return undefined; // Si une clé n'existe pas, retourne undefined
    }
  }

  return value;
}

export function formatNb(nb: number) {
  return nb.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: "code",
  });
}
