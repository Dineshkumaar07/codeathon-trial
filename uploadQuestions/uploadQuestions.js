const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://code-a-thon-2f494-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

const questions = {
  forms: {
    vehicle_inspection: {
      sections: {
        header: {
          title: {
            en: "Header Information",
            es: "Información de Encabezado",
          },
          questions: {
            truck_serial_number: {
              en: "Truck Serial Number (Example: 7301234, 730EJ73245, 73592849, 735EJBC9723)",
              es: "Número de Serie del Camión (Ejemplo: 7301234, 730EJ73245, 73592849, 735EJBC9723)",
              type: "text",
            },
            truck_model: {
              en: "Truck Model (Example: 730, 730 EJ, 735, 745)",
              es: "Modelo del Camión (Ejemplo: 730, 730 EJ, 735, 745)",
              type: "text",
            },
            inspection_id: {
              en: "Inspection ID (Auto-incremented unique number)",
              es: "ID de Inspección (Número único auto-incrementado)",
              type: "auto_increment",
            },
            inspector_name: {
              en: "Inspector Name",
              es: "Nombre del Inspector",
              type: "text",
            },
            inspector_employee_id: {
              en: "Inspection Employee ID",
              es: "ID de Empleado del Inspector",
              type: "text",
            },
            inspection_date_time: {
              en: "Date & Time of Inspection",
              es: "Fecha y Hora de la Inspección",
              type: "datetime",
            },
            inspection_location: {
              en: "Location of Inspection",
              es: "Ubicación de la Inspección",
              type: "text",
            },
            geo_coordinates: {
              en: "Geo Coordinates of Inspection (optional, in case of remote location)",
              es: "Coordenadas Geográficas de la Inspección (opcional, en caso de ubicación remota)",
              type: "geo",
              optional: true,
            },
            service_meter_hours: {
              en: "Service Meter Hours (Odometer reading)",
              es: "Horas del Medidor de Servicio (Lectura del Odómetro)",
              type: "numeric",
            },
            inspector_signature: {
              en: "Inspector Signature",
              es: "Firma del Inspector",
              type: "signature",
            },
            customer_name: {
              en: "Customer Name / Company Name",
              es: "Nombre del Cliente / Nombre de la Empresa",
              type: "text",
            },
            cat_customer_id: {
              en: "CAT Customer ID",
              es: "ID de Cliente CAT",
              type: "text",
            },
          },
        },
        tires: {
          title: {
            en: "Tires",
            es: "Neumáticos",
          },
          questions: {
            tire_pressure_left_front: {
              en: "Tire Pressure for Left Front",
              es: "Presión del Neumático Delantero Izquierdo",
              type: "numeric",
            },
            tire_pressure_right_front: {
              en: "Tire Pressure for Right Front",
              es: "Presión del Neumático Delantero Derecho",
              type: "numeric",
            },
            tire_condition_left_front: {
              en: "Tire Condition for Left Front",
              es: "Condición del Neumático Delantero Izquierdo",
              type: "multiple_choice",
              options: ["Good", "Ok", "Needs Replacement"],
            },
            tire_condition_right_front: {
              en: "Tire Condition for Right Front",
              es: "Condición del Neumático Delantero Derecho",
              type: "multiple_choice",
              options: ["Good", "Ok", "Needs Replacement"],
            },
            tire_pressure_left_rear: {
              en: "Tire Pressure for Left Rear",
              es: "Presión del Neumático Trasero Izquierdo",
              type: "numeric",
            },
            tire_pressure_right_rear: {
              en: "Tire Pressure for Right Rear",
              es: "Presión del Neumático Trasero Derecho",
              type: "numeric",
            },
            tire_condition_left_rear: {
              en: "Tire Condition for Left Rear",
              es: "Condición del Neumático Trasero Izquierdo",
              type: "multiple_choice",
              options: ["Good", "Ok", "Needs Replacement"],
            },
            tire_condition_right_rear: {
              en: "Tire Condition for Right Rear",
              es: "Condición del Neumático Trasero Derecho",
              type: "multiple_choice",
              options: ["Good", "Ok", "Needs Replacement"],
            },
            overall_tire_summary: {
              en: "Overall Tire Summary: (<1000 characters)",
              es: "Resumen General de los Neumáticos: (<1000 caracteres)",
              type: "text_area",
              maxLength: 1000,
            },
            tire_images: {
              en: "Attached images of each tire in the same order",
              es: "Imágenes adjuntas de cada neumático en el mismo orden",
              type: "image_upload",
              multiple: true,
            },
          },
        },
      },
    },
  },
};

db.ref("/")
  .set(questions)
  .then(() => {
    console.log("Data uploaded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error uploading data:", error);
    process.exit(1);
  });
