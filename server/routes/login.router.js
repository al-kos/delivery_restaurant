const express = require('express');
const fetch = require('node-fetch');
const { User } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('trying to login');
    const { roomid, pincode, phone } = req.body;
    if (roomid) { //если авторизовывается клиент
      const guestInfo = await fetch(`https://hotel-api-example.herokuapp.com/${roomid}`);
      const data = await guestInfo.json();
      console.log(data);
      if (!!data.guest) { //если гость найден, то проверяем пин и если все ок, то сохраняем в базу и кладем в сессию
        console.log('guest trying to login');
        if (data.guest.pincode === pincode) {
          const name = `${data.guest.firstname} ${data.guest.lastname}`;
          const phone = data.guest.phone;
          const user = await User.upsert({ room: roomid, name, phone, pin: pincode });
          const isAuth = true;
          const id = user.id;
          const role = 'client';

          req.session.user = {
            id,
            name,
            phone,
            roomid,
            role,
            isAuth
          };
          res.status(200).json({ user: req.session.user, message: 'login complete' });

        } else {
          return res.status(200).json({ user: false, message: 'wrong pin code' });
        }
      } else {

      }
    } else { //попытка авторизации staff'a
      console.log('staff trying to login');
      const staffInfo = await fetch('https://hotel-api-example.herokuapp.com/staff');
      const data = await staffInfo.json();
      //console.log(data.staff);
      const staff = data.staff.filter((el) => el.pincode === pincode && +el.phone === +phone)[0];
      console.log(staff);
      if (!!staff) {//если нашелся такой сотрудник, то авторизовываем
        const id = staff.id;
        const name = `${staff.firstname} ${staff.lastname}`;
        const phone = staff.phone;
        const role = staff.role;
        const isAuth = true;

        req.session.user = {
          id,
          name,
          phone,
          role,
          isAuth
        };
        res.status(200).json({ user: req.session.user, message: 'login complete' });
      } else {
        return res.status(200).json({ user: false, message: 'login failed' });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

module.exports = router;
