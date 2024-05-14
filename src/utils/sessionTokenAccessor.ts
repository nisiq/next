import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getAccessToken() {

  const session = await getServerSession(authOptions);  
 
  if(session){   
    const accessTokenDecrypted = session.access_token  
    return accessTokenDecrypted;
  }
  return null;
}

export async function getUserGroupId() {
  const session = await getServerSession(authOptions);  
 
  if(session){   
    const group_id = session.group_id  
    return group_id;
  }
  return null;
}

export async function getIdToken() {

  const session = await getServerSession(authOptions);  
  if(session){    
    const idTokenDecrypted = session.id_token  
    return idTokenDecrypted;
  }
  return null;
}