import axios from "axios";
import "@testing-library/jest-dom";
import { ConsumptionsService } from "../../src/services/consumptions.service";
import { IUploadData } from "../../src/components/pages/admin/upload/UploadButton";

jest.mock("axios");

describe("consumptions.service", () => {
  const service = new ConsumptionsService();
  const mockDate: string = "2021-02-26T20:42:16.652Z";
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should bulk create consumptions when function is called", async () => {
    // Given
    const mBulkCreateBody: IUploadData[] = [
      {
        consumptionId: 1,
        timeInterval: mockDate,
        heatDemand: 1897,
        electricityDemand: 1699,
        electricityPrice: 18,
        gasPrice: 15,
        siteId: 1,
        orgId: 1,
      },
      {
        consumptionId: 2,
        timeInterval: mockDate,
        heatDemand: 2897,
        electricityDemand: 2699,
        electricityPrice: 28,
        gasPrice: 25,
        siteId: 2,
        orgId: 2,
      },
      {
        consumptionId: 3,
        timeInterval: mockDate,
        heatDemand: 3897,
        electricityDemand: 3699,
        electricityPrice: 38,
        gasPrice: 35,
        siteId: 3,
        orgId: 3,
      },
    ];
    mockedAxios.post.mockResolvedValue({
      data: mBulkCreateBody,
    });

    // When
    const result = await service.bulkCreateConsumptions(mBulkCreateBody);

    // Then
    const expectedData = mBulkCreateBody.slice(0, -1);

    expect(result).toEqual(mBulkCreateBody);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith("/api/consumption/bulk-create", expectedData);
    });

//  Commented out as can only mock one axios.get
//   it('should return correct consumptions when function is called', async () => {
//     // Given
//     const mConsumptions = [
//       {
//           consumptionId: 1,
//           timeInterval: mockDateObject,
//           heatDemand: 1897,
//           electricityDemand: 1699,
//           electricityPrice: 18,
//           gasPrice: 15,
//           siteId: 1,
//           orgId: 1
//       },
//       {
//           consumptionId: 2,
//           timeInterval: mockDateObject,
//           heatDemand: 2897,
//           electricityDemand: 2699,
//           electricityPrice: 28,
//           gasPrice: 25,
//           siteId: 2,
//           orgId: 2
//       },
//       {
//           consumptionId: 3,
//           timeInterval: mockDateObject,
//           heatDemand: 3897,
//           electricityDemand: 3699,
//           electricityPrice: 38,
//           gasPrice: 35,
//           siteId: 3,
//           orgId: 3
//       }
//     ];
//     mockedAxios.get.mockResolvedValue({
//       data: mConsumptions
//     });

//     // When
//     const result = await mockService.getAllConsumptions();

//     // Then
//     expect(result).toEqual(mConsumptions);

//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith("/api/consumptions");
//   });
// });

    it('should get consumptions when function is called', async () => {
        // Given
        const mBody: IUploadData[] = [{
            consumptionId: 1,
            timeInterval: mockDate,
            heatDemand: 1897,
            electricityDemand: 1699,
            electricityPrice: 18,
            gasPrice: 15,
            siteId: 1,
            orgId: 1
        },
        {
            consumptionId: 2,
            timeInterval: mockDate,
            heatDemand: 2897,
            electricityDemand: 2699,
            electricityPrice: 28,
            gasPrice: 25,
            siteId: 2,
            orgId: 2
        },
        {
            consumptionId: 3,
            timeInterval: mockDate,
            heatDemand: 3897,
            electricityDemand: 3699,
            electricityPrice: 38,
            gasPrice: 35,
            siteId: 3,
            orgId: 3
        }];
        mockedAxios.get.mockResolvedValue({
            data: mBody
        });
        
        const fakeDate0 = new Date();
        const fakeDate1 = new Date();

        // When
        const result = await service.findAllConsumptionsBySiteIdAndTime(fakeDate0, fakeDate1, 1);

        // Then
        expect(result).toEqual(mBody);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/api/consumption/find/${fakeDate0}/${fakeDate1}/${1}`);
    });

});
