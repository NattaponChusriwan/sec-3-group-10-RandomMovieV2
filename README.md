# NETVIU - Random movies V.2

### About's NETVIU
เว็บไซต์สุ่มหนังเพื่อแก้ปัญหา 'วันนี้ดูหนังเรื่องไหนดี?'

## 🎞️ Home

:round_pushpin: **Movie Lists** _ผู้ใช้งานสามารถเลือกสุ่มหนังจากที่มีให้_
### Steps
1. ถ้าไม่ต้องการเลือกประเภทของหนังก่อนสุ่มให้คลิ๊กที่ปุ่ม `RANDOM`
2. หากต้องการเลือกประเภทหนังก่อนสุ่ม ให้เลือก ***More Filter*** และเลือกประเภทหนังที่ต้องการจะสุ่ม จากนั้นคลิ๊ก `RANDOM`
3. จะปรากฎ pop up `Random Result` ที่ได้จากการสุ่ม หากต้องการจะสุ่มใหม่สามารถคลิ๊กที่ปุ่ม `RANDOM` อีกครั้งได้ จนกว่าจะพอใจ
4. คลิ๊ก `CLOSE` เพื่อปิด pop up

:round_pushpin: **Add Movie** _ผู้ใช้งานสามารถเพิ่มหนังที่ต้องการจะสุ่มได้ด้วยตัวเอง กรณีที่หนังที่อยากดูไม่มีใน Movie Lists_
### Steps
1. คลื๊กที่ปุ่ม `Add Movie +`
2. __Movie name__ พิมพ์ชื่อหนังที่ต้องการเพิ่ม  __Genre__ เลือกประเภทของหนัง และ __Synopsis__ ระบุเรื่องย่อของหนัง
4. จากนั้นคลิ๊ก `ADD` เพื่อเพิ่ม
5. หากต้องการจะยกเลิกหรือปิดทิ้ง คลิ๊ก `CLOSE`

### :round_pushpin: หรือจะเลือกหนังมาสุ่มเอง
### Steps
1. คลิ๊กที่ poster หนังที่ต้องการจะสุ่ม(เลือกได้ไม่จำกัดจำนวน)
2. จากนั้นคลิ๊กที่ปุ่ม `RANDOM` จะปรากฎ pop up `Random Result` ที่ได้จากการสุ่ม
3. คลิ๊ก `CLOSE` เพื่อปิด pop up
4. หากต้องการจะนำหนังที่เลือกไว้ออก กดที่ปุ่ม `RESET`

## 🎞️ Movie Trivia
**The Quiz** _เป็นแบบทดสอบเล็กๆน้อยๆให้ผู้ใช้งานได้ทดสอบสมอง_
### Steps
1. มีโจทย์พร้อมรูปภาพและคำตอบเป็น choice
2. เลือกตอบได้ครั้งเดียว ถ้าเลือกคำตอบแล้วเป็น**สีแดง**คือ**ตอบผิด**ไม่ได้คะแนน ถ้า choice ที่เลือกเป็น**สีเขียว**คือ**ตอบถูก**และได้ 1 คะแนน
3. คลิ๊ก `NEXT QUESTION` เพื่อถัดไปข้ออื่น
4. เมื่อทำแบบทดสอบเสร็จ จะมีการสรุปคะแนนให้ใน **Your score** หากต้องการเล่นซ้ำ คลิ๊กที่ปุ่ม `RESTART`



## 📢จำนวน 4 component
### :small_red_triangle: AddEditMovie.vue
เป็น component `Add Movie/Edit +` ที่แก้ไขและเพิ่มรายชื่อหนัง สามารถรับ input __Movie name__ , __Genre__ และ __Synopsis__
* เมื่อใส่ข้อมูลเสร็จต้องการเพิ่ม คลิ๊กที่ปุ่ม `ADD`
* เมื่อแก้ไขเสร็จแล้วต้องการบันทึก คลิ๊กที่ปุ่ม `SAVE` 
* หากต้องการยกเลิก คลิ๊ก `CLOSE`

### :small_red_triangle: BaseButton.vue
เป็น component ปุ่มที่เป็น base ของ project ที่สามารถรับค่าของชื่อปุ่มเข้ามาได้

### :small_red_triangle: BaseMovieList.vue
* เป็น component ที่เป็น block เอาไว้แสดงข้อมูลหนัง เพิ่ม แก้ไข ลบ และ review
* ปุ่ม `EDIT` เมื่อกดข้อมูลจะถูกส่งไปที่ AddEditMovie Component
* ปุ่ม `DELETE` ลบรายชื่อหนังออกจาก Movie Lists
* **More Reviews** สามารถรับ input ข้อความ review หนังเรื่องนั้นๆ
  * เมื่อเพิ่มข้อความแล้วคลิ๊กที่ปุ่ม `POST` เพื่อแสดงข้อความการ review หนัง
  * ถ้าต้องการแก้ไขข้อความที่ review ไป คลิ๊กปุ่ม `EDIT` 
  * หากต้องการลบข้อความที่ review คลิ๊ก `DELETE`

### :small_red_triangle: RandomResult.vue
เป็น component ที่แสดงผล pop up `Random Result` ที่ได้จากการสุ่มหนัง


### 🔝ที่มุมขวาล่าง คลิ๊กเพื่อกลับขึ้นไปยังด้านบนของเว็บไซต์


---
### INT203 Client Side Web Programming II

#### semester 2/2564

#### Sec3 Group10

| No. | Name                 | Student ID  |
| :-: | -------------------- | ----------- |
|  1  | นางสาวอรวรรณ สระแก้ว | 63130500132 |
|  2  | นายธันณวัฒน์ ชูดำ    | 63130500142 |
|  3  | นายณัฐพล ชูศรีวัน    | 63130500154 |
|  4  | นายทศวรรษ สมตัว      | 63130500155 |
|  5  | นายศุภกร ไพรสกุลเดชา | 63130500158 |
