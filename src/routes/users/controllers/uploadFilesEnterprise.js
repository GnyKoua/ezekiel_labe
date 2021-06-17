import db from '../../../models'
import fs from 'fs'

export default async (req, res, next) => {
    try {

      if(!req.files) {
        return res.json({
            error: true,
            errorMessage: 'Aucun fichiers'
        })
      }

      const User = db.user
      const getUser = await User.findOne({ where: { id: req.user.id } })

      let licenceFile = req.files.licence
      let extraitFile = req.files.extraitkbis
      let permisFile = req.files.permis

      let renameLicence = new Date().getTime() + '_' + licenceFile.name
      let renameExtrait = new Date().getTime() + '_' + extraitFile.name
      let renamePermis = new Date().getTime() + '_' + permisFile.name

      //On vérifie si un dossier avec l'id de l'utilisateur existe, si non on crée un dossier avec son id
      if(!fs.existsSync(__dirname + '/../../../assets/uploadedFiles/' + req.user.id)) {
        fs.mkdirSync(__dirname + '/../../../assets/uploadedFiles/' + req.user.id)
      }

      let uploadPathLicence = __dirname + '/../../../assets/uploadedFiles/' + req.user.id + '/' + renameLicence
      let uploadathExtrait = __dirname + '/../../../assets/uploadedFiles/' + req.user.id + '/' +  renameExtrait
      let uploadPathPermis = __dirname + '/../../../assets/uploadedFiles/' + req.user.id + '/' + renamePermis


      licenceFile.mv(uploadPathLicence, function(err) {
        if (err) {
          return res.json({
              error: true,
              errorMessage: err
          })
        }

        });

        extraitFile.mv(uploadathExtrait, function(err) {
          if (err) {
            return res.json({
                error: true,
                errorMessage: err
            })
          }

          });

        permisFile.mv(uploadPathPermis, function(err) {
            if (err) {
              return res.json({
                  error: true,
                  errorMessage: err
              })
            }


            });

        getUser.licence = renameLicence
        getUser.extraitkbis = renameExtrait
        getUser.permis = renamePermis
        await getUser.save()
        return res.json({
          success: true,
          message: 'Files uploaded !'
        });
    } catch (err) {
      return next(err)
    }
  }




