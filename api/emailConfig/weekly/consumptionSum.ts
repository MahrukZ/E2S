import { ConsumptionService } from "../../services/consumptions.service";

export const findConsumptionSumAndCosts = async () => {
  const consumptionService = new ConsumptionService();

  const now = new Date();
  const firstDayOfTheWeek = now.getDate() - now.getDay() + 1;
  const lastDayOfTheWeek = firstDayOfTheWeek + 6;
  const firstDayOfLastWeek = new Date(now.setDate(firstDayOfTheWeek - 7));
  const lastDayOfLastWeek = new Date(new Date().setDate(lastDayOfTheWeek - 7));

  const consumptionSum =
    await consumptionService.findSumOfConsumptionsBySiteIdAndTime(
      firstDayOfLastWeek.toString(),
      lastDayOfLastWeek.toString(),
      1
    );
  return consumptionSum;
};
