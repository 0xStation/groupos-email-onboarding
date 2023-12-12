export function requireFields(obj: Record<string, any>) {
    let missingFields: string[] = [];
    Object.entries(obj).forEach(([name, value]) => {
      if (value === null || value === undefined) {
        missingFields.push(name);
      }
    });
    if (missingFields.length > 0) {
      throw Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
}
  
export function requireMethod(required: string, input?: string) {
if (required !== input) {
    throw Error("Method not allowed. Please use " + required);
}
}