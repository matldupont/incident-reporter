import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { decodeVIN } from '../utils/vin-decoder';

const incidentRouter = Router();

const testData = {
  '2C3AA63H75H632197': {
    vin: '2C3AA63H75H632197',
    make: 'Nissan',
    model: 'Rogue',
    year: 2019,
    incidents: [
      { note: 'Hit a post', date: new Date() },
      { note: 'Hit a post', date: new Date() },
      { note: 'Hit a post', date: new Date() },
    ],
  },
  '94MAA63H75H632197': {
    vin: '94MAA63H75H632197',
    make: 'Tesla',
    model: 'Model S',
    year: 2020,
    incidents: [
      {
        date: new Date(),
        note:
          'Cyclist was riding around and hit the back bumper.  what a turd.',
      },
    ],
  },
  '2C3AA63H89E632197': {
    vin: '2C3AA63H89E632197',
    make: 'Toyota',
    model: 'RAV4',
    year: 2017,
    incidents: [{ date: new Date(), note: 'Hit a post' }],
  },
  '2C3AA63H75H637849': {
    vin: '2C3AA63H75H637849',
    make: 'Mazda',
    model: '6',
    year: 2019,
    incidents: [{ date: new Date(), note: 'Broken window' }],
  },
};

let incidentData: Record<string, { incidents: object[] }> = {
  // ...testData,
};

const addNewIncident = async (incident: {
  vin: string;
  date: Date;
  note: string;
}) => {
  const { vin, date, note } = incident;
  if (!Object.keys(incidentData).includes(vin)) {
    const vinData: Record<string, string> = await decodeVIN(vin);
    if (!vinData.make || !vinData.model || !vinData.year) {
      throw new Error('Could not decode VIN');
    }
    let vehicleData = { vin, ...vinData, incidents: [] };
    incidentData = { ...incidentData, [vin]: vehicleData };
  }

  incidentData = {
    ...incidentData,
    [vin]: {
      ...incidentData[vin],
      incidents: [...incidentData[vin].incidents, { note, date }],
    },
  };
};

incidentRouter.get('/incidents', (req, res) => {
  res.send(incidentData);
});

incidentRouter.post(
  '/incidents',
  [
    body('vin').isLength({ min: 17, max: 17 }),
    body('note').isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error("You're missing some info.");
    }

    const { vin, date, note } = req.body;

    try {
      await addNewIncident({ vin, date, note });
    } catch (e) {
      res.status(400).send({ message: e.message });
      return;
    }

    res.send(incidentData);
  }
);

incidentRouter.delete('/incidents', (req, res) => {
  incidentData = {};
  res.send({});
});

export { incidentRouter };
