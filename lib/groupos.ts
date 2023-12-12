import { GROUPOS_API_KEY, GROUPOS_HOST } from "./constants";

export async function getOrCreateAccount({
  email,
}: {
  email: string;
}): Promise<{ address: string }> {
  try {
    const keysRes = await fetch(
      GROUPOS_HOST + "/api/v1/key/keys?customRef=" + email,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${GROUPOS_API_KEY}`,
        },
      }
    );
    const keysData = await keysRes.json();
    if (!keysData.success) {
      throw Error("Request unsuccessfull, error: ", keysData.error);
    }

    if (keysData.keys.length > 0) {
      return { address: keysData.keys[0].evmAddress };
    }

    const res = await fetch(GROUPOS_HOST + "/api/v1/key/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${GROUPOS_API_KEY}`,
      },
      body: JSON.stringify({
        customRef: email,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      throw Error("Request unsuccessfull, error: ", data.error);
    }
    return { address: data.evmAddress };
  } catch (e: any) {
    throw Error("Error in creating key: ", e.message);
  }
}
