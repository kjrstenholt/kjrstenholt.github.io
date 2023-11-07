	<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/TR/xhtml1/strict">
  <xsl:output
   method="text"
   indent="yes"
   encoding="UTF-8"
/>
  
<xsl:template match="interface">

/* primary elements */

body{

<xsl:variable name="bgImage" select="layout/bgImage" />

<xsl:if test="contains($bgImage, '.')">
  background-image:url("../../layout/<xsl:value-of select='layout/bgImage'/>");
</xsl:if>

}


.header{

margin-top:<xsl:value-of select="layout/headerTopMargin"/>px;
margin-right:<xsl:value-of select="layout/headerRightMargin"/>;
margin-bottom:<xsl:value-of select="layout/headerBottomMargin"/>px;
margin-left:<xsl:value-of select="layout/headerLeftMargin"/>;

padding-top:<xsl:value-of select="layout/headerTopPadding"/>px;
padding-right:<xsl:value-of select="layout/headerRightPadding"/>px;
padding-bottom:<xsl:value-of select="layout/headerBottomPadding"/>px;
padding-left:<xsl:value-of select="layout/headerLeftPadding"/>px;


}

.viewer{
	
margin-top:<xsl:value-of select="layout/viewerTopMargin"/>px;
margin-right:<xsl:value-of select="layout/viewerRightMargin"/>;
margin-bottom:<xsl:value-of select="layout/viewerBottomMargin"/>px;
margin-left:<xsl:value-of select="layout/viewerLeftMargin"/>;

padding-top:<xsl:value-of select="layout/viewerTopPadding"/>px;
padding-right:<xsl:value-of select="layout/viewerRightPadding"/>px;
padding-bottom:<xsl:value-of select="layout/viewerBottomPadding"/>px;
padding-left:<xsl:value-of select="layout/viewerLeftPadding"/>px;


}

.navigator{
	
margin-top:<xsl:value-of select="layout/navigatorTopMargin"/>px;
margin-right:<xsl:value-of select="layout/navigatorRightMargin"/>;
margin-bottom:<xsl:value-of select="layout/navigatorBottomMargin"/>px;
margin-left:<xsl:value-of select="layout/navigatorLeftMargin"/>;

padding-top:<xsl:value-of select="layout/navigatorTopPadding"/>px;
padding-right:<xsl:value-of select="layout/navigatorRightPadding"/>px;
padding-bottom:<xsl:value-of select="layout/navigatorBottomPadding"/>px;
padding-left:<xsl:value-of select="layout/navigatorLeftPadding"/>px;



}

</xsl:template>
</xsl:stylesheet>







