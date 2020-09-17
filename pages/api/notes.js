import { auth } from '../../lib/firebase-admin'

import { getUserNotes } from '../../lib/firestore-admin'

export default async (req, res) => {
  try{
    const user = await auth.verifyIdToken(req.headers.token);

    const last = req.query.last || null
    const limit = parseInt(req.query.limit)

    const notes = await getUserNotes(user.uid, last, limit);

    res.status(200).json({notes});
  }catch(error){
    console.log(error)
    res.status(500).json({error});
  }

}
