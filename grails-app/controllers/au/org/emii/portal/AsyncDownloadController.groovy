package au.org.emii.portal

class AsyncDownloadController {

    def gogoduckService
    def aodaacAggregatorService
    def downloadAuthService

    AsyncDownloadService getAggregatorService(aggregatorService) {
        switch (aggregatorService) {
            case "aodaac":
                return aodaacAggregatorService
            case "gogoduck":
                return gogoduckService
            default:
                throw new Exception("Cannot find aggregatorService for '$aggregatorService'")
        }
    }

    def verifyChallengeResponse(params, ipAddress) {
        // Verify request can go through
        def challengeResponse = params.challengeResponse
        if (! downloadAuthService.verifyChallengeResponse(ipAddress, challengeResponse)) {
            log.info "Could not verify challenge '$challengeResponse' from '$ipAddress'"
            throw new Exception('Could not verify challenge (captcha), denying download')
        }

        params.remove('challengeResponse')
    }

    def index = {

        def aggregatorServiceString = params['aggregatorService']
        params.remove('aggregatorService')

        try {
            verifyChallengeResponse(params, request.getRemoteAddr())

            AsyncDownloadService aggregatorService = getAggregatorService(aggregatorServiceString)

            def renderText = aggregatorService.registerJob(params)

            // Add accounting for that IP address
            downloadAuthService.registerDownloadForAddress(ipAddress, "$aggregatorService")

            render renderText
        }
        catch (Exception e) {
            log.error "Problem registering new aggregator job with type '$aggregatorServiceString' and parameters: '$params'", e
            render text: 'Problem registering new aggregator job', status: 500
        }
    }
}
