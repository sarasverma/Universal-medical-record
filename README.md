# Universal Medical Record

## Introduction :


The Universal Medical Record System is a digital platform designed to simplify medical record management for patients and healthcare providers. It stores records on a distributed web3 storage system, making the data secure, highly available, and resilient against failures.

With this innovative system, patients can easily access and manage their medical history, while healthcare providers can view and update patient records, ensuring high-quality care. One of the unique features of the Universal Medical Record System is that the user data is universally available to all persons granted access. This saves time for patients who seek treatment from multiple hospitals and doctors and results in better quality of care and support.

The Universal Medical Record System is also environmentally friendly, eliminating paper-based record systems, and reducing paper waste. It provides a secure and efficient solution for medical record management, improving patient outcomes, and reducing the risk of medical errors. In summary, this digital platform is a game-changer in medical record management, providing a convenient, secure, and efficient platform for patients and healthcare providers to access and manage medical records.
## The Problem :
Patients with complex medical histories or those who see multiple doctors face challenges in managing their medical records. Physical copies of medical records and prescriptions can easily get lost or damaged, leading to confusion and potential medical errors. Patients may also forget important details about their medical history or medications, which can impact the quality of care they receive. Accessing medical records can also be difficult when patients need to see a new doctor or receive care while traveling, leading to delays in treatment and potential health risks. 

Overall, the lack of a universal, secure system for medical record management creates unnecessary stress and can negatively impact patient outcomes.

## Our Solution :
The Universal Medical Record System is a comprehensive solution to the challenges of medical record management. By providing a universal secure, digital platform for patients to store and manage their medical records and prescriptions, the application simplifies the process of keeping track of important medical information. Patients can access their records from anywhere, at any time, and easily share them with healthcare providers as needed. This helps to ensure that patients receive the appropriate care and treatment, even when they are away from home or seeing a new doctor.

In addition, the Universal Medical Record System makes it easier for doctors to provide high-quality care to their patients. By giving doctors access to complete medical histories and prescription records, they can quickly identify potential health risks, avoid medication interactions, and provide more personalized care. The application also streamlines the communication between patients and doctors, allowing for more efficient and effective healthcare delivery. Overall, the Universal Medical Record System is a game-changer for medical record management, improving patient outcomes and increasing the quality of care provided by healthcare professionals.

## Aspects of Universal Medical Record :

* User Authentication: The system requires the creation of user accounts for both patients and doctors. The users can authenticate themselves with their login credentials and access the platform's features.

* Secure Data Storage: The platform must provide secure storage for medical records and prescriptions, ensuring that the user's data is protected from unauthorized access.
 
* Decentralized Storage: The platform leverages web3storage, built on top of IPFS and Filecoin, to ensure the secure and distributed storage of medical records and prescriptions, protecting users' data from unauthorized access.

* Uploading and Managing Medical Records: The platform allows patients to upload and manage their medical records, including lab reports, diagnosis, and treatment history.

* Prescription Management: Patients can upload their prescriptions, and doctors can add them as needed. Patients can also view their current and past prescriptions.

* Access Control: Patients can provide access to their doctors to add their medical records and prescriptions.

* Analysis and Tracking: Patients can track their medical history, view analysis reports of their records.

* Communication: The platform provides a communication channel between patients and healthcare providers.

* User-Friendly Interface: The platform's user interface should be easy to navigate, with clear labels, descriptions, and instructions.

## Project Features :

* User Registration: Patients and doctors can register for an account on the platform using their email address and password.

* User Profile: Users can create and update their profile information, including their personal details.

* Medical Record Management: Patients can upload and manage their medical records, including lab reports, diagnosis, and treatment history, prescriptions. Doctors can also add the patients medical records, prescriptions.

* Access Control: Patients can choose to share their medical records and prescriptions with healthcare providers of their choice, and they can revoke access at any time.

* Analytics and Insights: Patients can view analysis reports of their medical records.

* Web Application: The platform is fully responsive, allowing patients and doctors to access it on their smartphones for convenient and easy access.

* Security and Privacy: The platform ensures the security and privacy of user data by using secure storage, and access controls.

## Technologies used for development :

### Frontend : 

  * React and Vite - Used to create a visually appealing webpage and add styling, layout and control the look and feel of the website.
  ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

### Backend :
  
  * Google Cloud:- We have made use of the Google Cloud's flexible data storage system in order to store the generated diagnosis reports as it offers safe and secure storage systems with easy file retrieval mechanism.
  
  * AMD instances:- Our project Universal Medical Record has been deployed on the AMD Virtual Machine instance combining the powerful capabilities of AMD virtual machine running on the Google Cloud Platform.
  
  * Web3 - for prescription upload on web3 storage which is built on top of ips and blockchain and our prescriptions metadata is stored on firebase

## Project Implementation : 
Here's our [project demonstration](https://www.youtube.com/watch?v=rS0AT7z5XFo) on youtube and live site on [GoogleCloud AMD instance](http://34.131.143.183/), [Netlify](https://universalmedicalrecord.netlify.app)

1. Sign-in / Sign-up page of Universal Medical Record.

* SignUp Page

![1](https://user-images.githubusercontent.com/114461220/232249583-2d8dfa1f-6a56-475f-9914-7322045dfdf2.png)



* Sign-in page

![2](https://user-images.githubusercontent.com/114461220/232249585-752cd75c-3d3b-41d4-9fba-2e15d8dea113.png)



2. Account Page of the User - Patient / Doctor.

* Patient Account: 

![3](https://user-images.githubusercontent.com/114461220/232309614-aefdc160-ddef-47d4-a2a4-adef6bdfdc7e.png)


* Doctor Account:

![4](https://user-images.githubusercontent.com/114461220/232321942-d83ea0a4-44d6-4820-a977-9f5bd6a8a3fe.png)



3. Access page where Doctors can access the patient. Patient can also see who is Accessing them

* Notification page where patient can accept the doctors access request.

![5](https://user-images.githubusercontent.com/114461220/232322138-03212317-8f6e-470f-94b1-49d9bc22697c.png)


* Patient can see who is accessing them:

![6](https://user-images.githubusercontent.com/114461220/232322198-77efe62c-6ae0-45d0-8ec8-18333157013f.png)



4. Add Record page where user can add the medical details, precriptions etc.


![8](https://user-images.githubusercontent.com/114461220/232322391-94639a32-3e66-4ec7-aee3-2e25c48fe2a7.png)



5. Analysis / History page where user can see his full medical hsitory with details


* Patient can see their medical histroy:

![9](https://user-images.githubusercontent.com/114461220/232322483-bd253be8-173e-4f75-9d54-f70419c1ae85.png)


* Doctor can see the medical record of the patient and can also add the record of the patient:

![7](https://user-images.githubusercontent.com/114461220/232322299-1ff37433-49e8-4e5f-af9e-ff1ac32cb322.png)


* Doctors can see their patient's Medical history:

![10](https://user-images.githubusercontent.com/114461220/232322551-c2541431-a7dd-4604-8961-17faee2fe6b0.png)


## Key Advantages of the "Universal Medical Record System"
The key advantage of the Universal Medical Record System is its ability to provide a universal,  convenient, efficient, personalized, and secure solution for medical record management, while also contributing to a healthier planet by reducing paper waste.

This digital platform streamlines communication between patients and doctors, improving the quality of care received, and eliminates the need for physical paper records, reducing the environmental impact of medical record management.

By SOLVING FOR INDIA, the Universal Medical Record System helps to ensure that every Indian at the risk of or suffering from medical conditions has access to the appropriate, quality care and treatment, enabling them to lead a better quality of life.


