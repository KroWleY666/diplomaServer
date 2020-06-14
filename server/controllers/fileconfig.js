

module.exports = (from,to) => {
    const today = new Date();
return `<html>

<head>
   <meta charset="utf-8">
   <title>Training plan</title>
   <style>
      .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 50px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         color: rgb(47, 47, 47);
      }

      .title-box {
         margin-left: 20%;
         color: #3743AB;
         margin-bottom: 7%;
      }

      .athlete {
         margin-left: 10%
      }

      .coach-box {
         margin-bottom: 2%;
      }

      .athlete-title {
         color: #FF7100;
         font-size: 18px;
         font-weight: 600;
      }

      .content-table {
         border-collapse: collapse;
         margin-left: 5%;
         margin-top: 30px;
         font-size: 0.9em;
         min-width: 90%;
         border-radius: 5px 5px 0 0;
         overflow: hidden;
         box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }

      .content-table thead tr {
         background-color: #3743AB;
         color: #ffffff;
         text-align: left;
         font-weight: bold;
      }

      .content-table th,
      .content-table td {
         padding: 12px 15px;
      }

      .content-table tbody tr {
         border-bottom: 1px solid #dddddd;
      }

      .content-table tbody tr:last-of-type {
         border-bottom: 2px solid #3743AB;
      }

      .content-table tbody tr.active-row {
         font-weight: bold;
         color: #3743AB;
      }

      .training-title{
         margin-left: 5%;
         font-size: 20px;
      }

      .date-title{
         margin-left: 10%;
         font-size: 14px;
      }

      .date-title1{
         margin-left: 10%;
      }

      .content-table td {
         text-align: center;
      }

      .note {
         color: #3743AB;
         font-size: 14px;
         font-weight: 600;
      }

      .info-heading{
         background-color: #D3D7FF;
      }

      .level {
         margin-left: -15%;
      }

      .duration {
         margin-left: -5%;
      }

   </style>
</head>

<body>
   <div class="invoice-box">
      <div class="title-box">
         <h1>План тренировочного процесса</h1>
      </div>
      <div class="coach-box">
         <span class="athlete">
            <span class="athlete-title">Спортсмен: </span> Беляева Юлия Алексеевна
         </span>

         <span class="athlete">
            <span class="athlete-title">Тренер: </span> Иванов Иван Иванович
         </span>
      </div>

      <span class="athlete">
         <span class="athlete-title">Период: </span> 25.05.2020 - 01.09.2020
      </span>

      <div>
         <table class="content-table">
            <thead>
               <tr>
                  <th >
                     <span class="training-title">Кардиотренировка</span>
                  </th>
                  <th colspan="2">
                     <span class="date-title">Дата проведения: 15.06.2020</span>
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr class="info-heading">
                  <th>
                     <span class="level">Уровень тренировочной нагрузки: Небольшой</span>
                  </th>
                  <th colspan="2">
                     <span class="duration">Длительность: 45 минут</span>
                  </th>
               </tr>
               <tr>
                  <th width="300">Упражнение</th>
                  <th width="100">Подходы</th>
                  <th width="100">Повторения</th>
               </tr>
               <tr>
                  <td width="300">1. Выпрыгивание из приседа</td>
                  <td width="100">3</td>
                  <td width="100">15</td>
               </tr>
               <tr>
                  <td width="300">2. Бёрпи</td>
                  <td width="100">3</td>
                  <td width="100">10</td>

               </tr>
               <tr>
                  <td width="300">3. Выпад с махом</td>
                  <td width="100">3</td>
                  <td width="100">15</td>
               </tr>
               <tr>
                  <td width="300">4. Асимметричные отжимания</td>
                  <td width="100">3</td>
                  <td width="100">15</td>
               </tr>
               <tr>
                  <td width="300">5. Подтягивания на перекладине</td>
                  <td width="100">2</td>
                  <td width="100">10</td>
               </tr>
               <tr>
                  <td width="300">6. Диагональные выпады</td>
                  <td width="100">3</td>
                  <td width="100">25</td>
               </tr>
               <tr>
                  <td width="300">8. Прямые скручивания</td>
                  <td width="100">3</td>
                  <td width="100">30</td>
               </tr>
               <tr>
                  <td colspan="3" > <span class="note">Примечание: </span> Перед данной тренировкой провести суставную разминку в течение 10 минут. </td>
               </tr>
            </tbody>
         </table>

         <table class="content-table">
            <thead>
               <tr>
                  <th >
                     <span class="training-title">Силовая тренировка</span>
                  </th>
                  <th colspan="2">
                     <span class="date-title1">Дата проведения: 18.06.2020</span>
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr class="info-heading">
                  <th>
                     <span class="level">Уровень тренировочной нагрузки: Средний</span>
                  </th>
                  <th colspan="2">
                     <span class="duration">Длительность: 60 минут</span>
                  </th>
               </tr>
               <tr>
                  <th width="300">Упражнение</th>
                  <th width="100">Подходы</th>
                  <th width="100">Повторения</th>
               </tr>
               <tr>
                  <td width="300">Присед со штангой</td>
                  <td width="100">2</td>
                  <td width="100">15</td>

               </tr>
               <tr>
                  <td width="300">Становая тяга</td>
                  <td width="100">2</td>
                  <td width="100">20</td>
               </tr>
               <tr>
                  <td width="300">Подтягивания на перекладине</td>
                  <td width="100">3</td>
                  <td width="100">15</td>
               </tr>
               <tr>
                  <td width="300">Отжимания от пола</td>
                  <td width="100">3</td>
                  <td width="100">20</td>
               </tr>
               <tr>
                  <td width="300">Сгибание рук со штангой</td>
                  <td width="100">3</td>
                  <td width="100">20</td>
               </tr>
               <tr>
                  <td width="300">Гиперэкстензия</td>
                  <td width="100">3</td>
                  <td width="100">20</td>
               </tr>
               <tr>
                  <td colspan="3" > <span class="note">Примечание: </span> Перед данной тренировкой провести суставную разминку в течение 10 минут. </td>
               </tr>
            </tbody>
         </table>
      </div>

   </div>
</body>

</html>
    `

};
