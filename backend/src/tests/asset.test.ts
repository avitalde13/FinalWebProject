import { Request, Response } from "express";
import assetsController from "../controllers/assets_controller";
import Asset, { IAsset } from "../models/assets_model";

// Mock Express Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {} as Response;

describe("Assets Controller", () => {
  describe("getAllAssets", () => {
    it("should return all assets", async () => {
      // Mock the find method of the Asset model
      const mockAssets = [{ address: "123 Main St", price: 100000, fileName: "asset1.jpg" }, { address: "456 Elm St", price: 150000, fileName: "asset2.jpg" }];
      jest.spyOn(Asset, "find").mockResolvedValue(mockAssets);

      // Mock request and response objects
      mockResponse.send = jest.fn();

      // Call the getAllAssets controller method
      await assetsController.getAllAssets(mockRequest, mockResponse);

      // Assert that the response is sent with the correct data
      expect(mockResponse.send).toHaveBeenCalledWith(mockAssets);
    });

    it("should handle errors", async () => {
      // Mock the find method of the Asset model to throw an error
      jest.spyOn(Asset, "find").mockRejectedValue(new Error("Database error"));

      // Mock request and response objects
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      // Call the getAllAssets controller method
      await assetsController.getAllAssets(mockRequest, mockResponse);

      // Assert that the response status is set to 500 and an error message is sent
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });

  // Add more tests for other controller methods as needed
});
