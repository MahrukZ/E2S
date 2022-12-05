import { IConsumption } from "../data/models/consumptions.model";
import { ConsumptionRepository } from "../data/repositories/consumptions.repository";

export class ConsumptionService {
  private consumptionRepository: ConsumptionRepository;

  constructor() {
    this.consumptionRepository = new ConsumptionRepository();
  }

  async bulkCreateConsumptions(consumptions: IConsumption[]) {
    return await this.consumptionRepository.bulkCreateConsumptions(
      consumptions
    );
  }

  async createConsumption(consumption: IConsumption) {
    return await this.consumptionRepository.createConsumption(consumption);
  }

    async getAllConsumptions() {
        return await this.consumptionRepository.getAllConsumptions();
    }

    async findSumOfConsumptionsBySiteIdAndTime(startTime: string, endTime: string, siteId: number) {
        return await this.consumptionRepository.findSumOfConsumptionsBySiteIdAndTime(startTime, endTime, siteId);
    }

    async findAllConsumptionsBySiteIdAndTime(startTime: string, endTime: string, siteId: number) {
        return await this.consumptionRepository.findAllConsumptionsBySiteIdAndTime(startTime, endTime, siteId);
    }
}
